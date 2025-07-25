// deploy.js

const { execSync } = require('child_process')
const packageJson = require('../package.json')

function getAppToken(appId) {
  const token = process.env[`TT_TOKEN_${appId}`]
  if (!token) {
    throw new Error(
      `Token not found for appId: ${appId}，TokenKey: TT_TOKEN_${appId}`
    )
  }
  return token
}

async function getGitDescription() {
  try {
    const stdout = await execSync('git log --pretty=format:"[%h][%an] (%s)" -1')
    const description = stdout.toString().trim().replaceAll(/"/g, '')
    return description
  } catch (error) {
    console.error('执行Git命令失败:', error)
    return null
  }
}

async function uploadApp(config) {
  const { appId, token, distPath, env, version } = config
  const changelog = await getGitDescription()

  console.log(`[UPLOAD] Uploading to AppID: ${appId}, Environment: ${env}`)

  try {
    // 全局设置
    execSync(`tma set-config --proxy http://zproxy-euc1.eu.aws.rccad.net:80`, {
      stdio: 'inherit',
    })

    // 设置token
    execSync(`tma set-app-config ${appId} --token ${token}`, {
      stdio: 'inherit',
    })

    // 上传
    execSync(
      `tma upload --app-version "${packageJson.version}" --app-changelog "[${version}] ${changelog}" ${distPath}`,
      {
        stdio: 'inherit',
        env: {
          ...process.env,
        },
      }
    )

    // 预览
    execSync(`tma preview --small ${distPath}`, {
      stdio: 'inherit',
    })

    console.log(`[SUCCESS] Upload and preview success for AppID: ${appId}`)
  } catch (error) {
    console.error(`[ERROR] Upload failed for AppID: ${appId}`, error)
    process.exit(1)
  }
}

async function main() {
  const ENV = process.env.TT_CI_ENVIRONMENT || 'dev'
  const APP_IDS = (process.env.TT_APP_IDS || '').split(',').filter(Boolean)
  const DIST_PATH = 'dist/build/mp-toutiao'
  const APP_VERSION = `${process.env.ENV}.${process.env.CI_COMMIT_REF_NAME}`

  if (APP_IDS.length === 0) {
    throw new Error(`[WARNING] No appId provided. APP_IDS is empty.`)
  }

  console.log(`[INFO] Using dist path: ${DIST_PATH}`)
  console.log(`[INFO] Build Release Version: ${APP_VERSION}`)
  console.log(`[INFO] Uploading to ${APP_IDS.length} app(s):`, APP_IDS)

  for (const appId of APP_IDS) {
    const token = getAppToken(appId)
    uploadApp({
      appId,
      token,
      distPath: DIST_PATH,
      env: ENV,
      version: APP_VERSION,
    })
  }
}

main()

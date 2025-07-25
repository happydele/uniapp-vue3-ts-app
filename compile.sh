
export TT_CI_ENVIRONMENT=$ENV

cat /root/.npmrc >> .npmrc
cat .npmrc

pnpm install --verbose
pnpm run $ENV

# pnpm setup
# pnpm add -g tt-ide-cli
apk add git
git config --global --add safe.directory /builds/scm_project/rwf/rwf-tt-miniprogram

pnpm run upload
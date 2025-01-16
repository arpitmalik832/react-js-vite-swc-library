/**
 * Branch name validation configuration.
 * @file This file is saved as `.validate-branch-namerc.cjs`.
 */
module.exports = {
  pattern:
    '^(development|staging|beta|release|master|main){1}$|^((task|release|bugfix|hotfix)/|(feature-))[a-zA-Z0-9._-]+$|[a-zA-Z0-9._-]+$',
  errorMsg: 'Error: your branch name must adhere to the below pattern.',
};

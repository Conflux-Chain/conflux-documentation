---
sidebar_postion: 6
displayed_sidebar: generalSidebar
toc_max_heading_level: 4
---

# 参与贡献

:::info
感谢您对我们文档站点的关注！ 我们非常珍视您的支持，并且很高兴能够听取社区的见解和专业知识。 本页面概述了贡献的指南、流程，以及您所付出的努力可能获得的奖励。

如果您正在寻求 Conflux 基金会对您的项目进行资助，请参考我们的 [**Grants**](./build/grants.md) 页面。

:::

## 如何贡献

我们欢迎各种形式的贡献，包括但不限于：

1. 指出（内容上的）错误/笔误，并（可选的）给出解决方案
2. 提供翻译
3. 添加或改进配图、表格或其他可视化内容
4. 对文档组织结构的建议
5. 编写或更新教程/指南
6. 添加/更新代码示例
7. 提高文档撰写的质量

To make a contribution, please take one of the following actions:

- **Report an Issue**: If you spot a problem or is willing to suggest improvements, [create an issue](#create-an-issue) to let us know.
- **Submit Changes**: For direct contributions to content, [create a pull request](#create-a-pull-request).
- **Help with Translation**: To contribute translations, please follow our [translation guidelines](#provide-translation).

### 创建 Issue

You can create an issue for the following purposes:

- To report any mistakes or typos.
- To request new content or improvements to current content.

You can typically create an issue directly through the [GitHub web page](https://github.com/Conflux-Chain/conflux-documentation/issues/new/choose). Here, you'll find various templates to guide your issue submission.

![issue templates](image/2023-04-13-15-16-53.png)

If you're able to address the issue yourself, we encourage you to take the initiative. When creating an issue, you can indicate your willingness to resolve it. For bug reports, select the option “I'd be willing to fix this issue myself” in the BUG template. For feature requests, select “I'd be willing to contribute this feature myself” in the Feature Request template.

```md

// issue 的 BUG 模版
- [ ] I'd be willing to fix this issue myself.
// issue 的 Feature Request 模版
- [ ] I'd be willing to contribute this feature myself

```

Alternatively, you can submit your issue through the [Conflux Documentation Issue Form](https://forms.office.com/r/pKVBywZwLY). If your submission is approved, it will be created on the GitHub repository.

![Conflux Documentation Issue Form](image/Conflux%20Documentation%20Issue%20Form.png)

### 创建 Pull Request

Contributing to projects through a pull request (PR) is a valuable way to improve existing documentation or code. This guide will walk you through the process step by step, ensuring clarity and ease of understanding, especially for those new to GitHub and git operations.

For complex operations, you can also check the [closed pull requests](https://github.com/Conflux-Chain/conflux-documentation/pulls?q=is%3Apr+is%3Aclosed) for grammar reference. For example,

- [Added Ecosystem Page + Video](https://github.com/Conflux-Chain/conflux-documentation/pull/392) shows how to add an article with video reference.
- [feat: template example](https://github.com/Conflux-Chain/conflux-documentation/pull/410) shows how to make use of mdx's feature to create similar pages using template.

:::note

This process does not apply to [TRANSLATIONS](#provide-translation).

:::

#### Minor Changes via Github Web UI

For simple corrections or enhancements like typos or sentence improvements:

1. Navigate to the Page:
   - Go to the **English version** of the page you wish to edit and click the "Edit this page" button. This button is typically found at the top or bottom of the page.
     - ![Edit this page](./image/2024-01-04-17-09-22.png)

2. Forking the Repository:
   - You'll be redirected to GitHub, where you might see a prompt saying, "You need to fork this repository to propose changes." Click "Fork this repository".
     - ![Fork this repository](./image/2024-01-04-17-12-54.png)

3. Making Edits:
   - Once in the editor mode, make the necessary changes. After editing, scroll to the bottom where you'll find the "Commit changes" section. Fill in a brief description of your changes, then click "Propose changes".

4. Submitting the Pull Request:
   - After proposing changes, you'll be directed to a new page to initiate the pull request. Click "Create pull request". Double-check the changes and fill in any additional information if necessary, then finalize by clicking "Create pull request" again.
     - Remember to check preflight checks by adding "x".
     - ![preflight checks](image/2024-01-04-17-36-59.png)

#### Local Development for Substantial Changes

:::tip

Refer to [Github's tutorial](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) if you are not familiar with git or Github operations.

:::

For more significant contributions like adding a new page or extensive revisions:

1. Setting Up:
   - Ensure you have [node.js](https://nodejs.org/en) (version `>= 18`) and [yarn](https://yarnpkg.com/getting-started/install) installed.
   - Fork and clone the [documentation repository](https://github.com/Conflux-Chain/conflux-documentation). Detailed instructions for forking and cloning are available on GitHub's help pages.

2. Making Changes Locally:
   - Run `yarn && yarn start` in your terminal to preview the site at `http://localhost:3000`.
   - Navigate to the `docs/**` folder in your cloned repository to make changes. Refresh your local server to see updates.

3. Submitting Your Changes:
   - After making changes, run `yarn build` to ensure everything compiles correctly.
   - Commit your changes with a meaningful message, then push to your forked repository. Initiate a pull request on GitHub by comparing your branch to the original repository.

#### Working on an Existing Issue

To avoid overlapping efforts and streamline contributions, it is suggested to follow these steps:

1. Check for Accepted Issues:
   - Look for issues labeled "ACCEPTED" or similarly indicating readiness for contributions. If unsure, ask in the issue comments.

2. Announce Your Intentions:
   - Comment on the issue stating that you are working on it. This helps prevent duplicate efforts.

3. (Optional)Link Your Contributions:
   - When committing your changes, reference the issue number in your commit message, e.g., `fix: typo. Ref #123456`。

### 提供翻译

:::note

A translation pull request in the Github repo will NOT be accepted.

:::

我们使用 [Crowdin](https://crowdin.com/project/conflux) 进行文档翻译集成。 Crowdin 能够帮助我们了解源文件更改后已翻译内容是否需要变更。 任何人都能在Crowdin中提交翻译，已翻译内容在审查后会被推送至文档的Github仓库。

#### Crowdin 教程

在 Crowdin 上访问我们的项目页面：https://crowdin.com/project/conflux 或 https://zh.crowdin.com/project/conflux， 并选择您想要翻译的语言。

![languages](image/2023-04-13-15-54-46.png)

您可以选择一个文件开始翻译。

![files](image/2023-04-13-15-57-59.png)

您需要登录才能编辑翻译。 无需烦躁，只需点击几个按钮，就能使用您的 Github 账户登录。

![login](image/2023-04-13-16-01-17.png)

进入页面后即可开始翻译。 点击左侧面板上的源字符串，之后即可输入翻译或编辑字符串。 别忘了点击 SAVE 按钮，之后请等待您的翻译内容接受审核。

![translation](image/2023-04-13-16-06-44.png)

一旦审核完成，翻译内容将被推送到Github 仓库，您可以在官方文档站点访问您提供的翻译内容。

## 贡献者 POAP

After the end of each quarter, we issue a batch of Contributor POAPs (Proof of Attendance Protocol) to recognize individuals who have made contributions to our documentation site. To be eligible for minting a POAP, your contribution must meet the following "ACCEPTED" criteria:

- Creation of an issue that has been labelled "ACCEPTED" by the repo maintainter.
- Successful merging of a Pull Request into the main branch.
- Full review and approval of a translation string.

**POAP Contract Addresses:**

- **Core Space:** [cfx:acd97pbhxm11cegrz3anuuvcuj9j0nh956a108f5cc](https://www.confluxscan.io/address/cfx:acd97pbhxm11cegrz3anuuvcuj9j0nh956a108f5cc)
- **eSpace:** [0x500371e7ec0b5bca911a11964300e694bb0fec9d](https://evm.confluxscan.io/address/0x500371e7ec0b5bca911a11964300e694bb0fec9d)

These POAPs, deployable in both Core Space and eSpace, function as a unified NFT, symbolizing your valuable contribution across the Conflux network.

### 特殊 POAP

除了常规的贡献者 POAP，我们还会铸造特殊 POAP 用于表彰和鼓励重要贡献。 重要贡献包括如：高质量的指南或对项目的持续、频繁的贡献。 特殊 POAP 的颁发由项目维护者根据具体情况决定。

### FC (FansCoin) Rewards for POAP Holders

As a token of appreciation, contributors can claim [FansCoin (FC)](https://confluxscan.io/token/cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2) rewards for each POAP they own. The amount of FC awarded varies depending on the specific POAP.

> Please note that the FC reward pool is located exclusively in Core Space at [cfx:achm6kb92by13rpvwd04zscn1127zuaseu25usm7sc](https://confluxscan.io/address/cfx:achm6kb92by13rpvwd04zscn1127zuaseu25usm7sc).

### Regular Review of POAP Issuing Rules

请注意，POAP 发行规则每三个月进行审查并可能进行修改。 这将保证我们的本指导方针能足够有效地鼓励社区为文档建设作出贡献。

我们期待您的贡献，并感谢您帮助我们改进我们的文档网站！ 如果您有任何问题或需要帮助，欢迎随时在我们的 Github 仓库中创建Issue。

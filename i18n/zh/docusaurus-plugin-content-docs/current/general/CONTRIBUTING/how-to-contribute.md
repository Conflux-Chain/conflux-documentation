---
title: 如何贡献
sidebar_position: 1
description: 如何为我们的文档网站做出贡献
displayed_sidebar: generalSidebar
---

:::info

感谢您对在我们的文档网站作出贡献感兴趣！ 我们非常珍视您的支持，并且很高兴能够听取社区的见解和专业知识。 本页面概述了贡献的指南、流程，以及您所付出的努力可能获得的奖励。

如果您正在寻求 Conflux 基金会对您的项目进行资助，请参阅我们的[**资助**](../build/grants.md) 页面。

:::

我们欢迎各种形式的贡献，包括但不限于：

1. 指出（内容上的）错误/笔误，并（可选的）给出解决方案
2. 提供翻译
3. 添加或改进配图、表格或其他可视化内容
4. 对文档组织结构的建议
5. 编写或更新教程/指南
6. 添加/更新代码示例
7. 提高文档撰写的质量

如果您想做出贡献，您可以采取以下行动：

- **报告一个 Issue**：如果您发现了问题或希望提出改进建议，请 [创建一个 issue](#create-an-issue) 让我们知道。
- **提交更改**：如果您想要对错误内容直接进行修改，请创建一个 [pull request](#create-a-pull-request)。
- **提供翻译**：如果您想要为技术文档贡献翻译，请参阅我们的[翻译指南](#provide-translation)。

## Create an Issue

You can create an issue for the following purposes:

- 报告您发现的任何错误或打字/排版问题。
- 请求新内容或对当前内容进行改进。

您通常可以通过 [GitHub网页](https://github.com/Conflux-Chain/conflux-documentation/issues/new/choose) 直接创建一个问题。 在这里，您会找到各种模板来指导您的问题提交。

![issue templates](../image/2023-04-13-15-16-53.png)

If you're able to address the issue yourself, we encourage you to take the initiative. When creating an issue, you can indicate your willingness to resolve it. For bug reports, select the option “I'd be willing to fix this issue myself” in the BUG template. For feature requests, select “I'd be willing to contribute this feature myself” in the Feature Request template.

```md

// issue 的 BUG 模版
- [ ] I'd be willing to fix this issue myself.
// issue 的 Feature Request 模版
- [ ] I'd be willing to contribute this feature myself

```

另外，您也可以通过[ Conflux文档问题表单](https://forms.office.com/r/pKVBywZwLY) 提交您的问题。 如果您提交的问题被批准，它将在 GitHub 仓库中被创建。

![Conflux Documentation Issue Form](../image/Conflux%20Documentation%20Issue%20Form.png)

## Create a Pull Request

通过创建拉取请求（PR）对项目作出贡献是改进现有文档或代码十分有价值的方式。 This guide will walk you through the process step by step, ensuring clarity and ease of understanding, especially for those new to GitHub and git operations.

For complex operations, you can also check the [closed pull requests](https://github.com/Conflux-Chain/conflux-documentation/pulls?q=is%3Apr+is%3Aclosed) for grammar reference. For example,

- [Added Ecosystem Page + Video](https://github.com/Conflux-Chain/conflux-documentation/pull/392) shows how to add an article with video reference.
- [feat: template example](https://github.com/Conflux-Chain/conflux-documentation/pull/410) shows how to make use of mdx's feature to create similar pages using template.

:::注意

This process does not apply to [TRANSLATIONS](#provide-translation).

:::

### Minor Changes via Github Web UI

For simple corrections or enhancements like typos or sentence improvements:

1. Navigate to the Page:
   - Go to the **English version** of the page you wish to edit and click the "Edit this page" button. This button is typically found at the top or bottom of the page.
     - ![Edit this page](../image/2024-01-04-17-09-22.png)

2. Forking the Repository:
   - You'll be redirected to GitHub, where you might see a prompt saying, "You need to fork this repository to propose changes." Click "Fork this repository".
     - ![Fork this repository](../image/2024-01-04-17-12-54.png)

3. Making Edits:
   - Once in the editor mode, make the necessary changes. After editing, scroll to the bottom where you'll find the "Commit changes" section. Fill in a brief description of your changes, then click "Propose changes".

4. Submitting the Pull Request:
   - After proposing changes, you'll be directed to a new page to initiate the pull request. Click "Create pull request". Double-check the changes and fill in any additional information if necessary, then finalize by clicking "Create pull request" again.
     - Remember to check preflight checks by adding "x".
     - ![preflight checks](../image/2024-01-04-17-36-59.png)

### Local Development for Substantial Changes

:::tip

如果您对 git 或 Github 的操作不熟悉，请参考[ Github 教程](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)。

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

### Working on an Existing Issue

To avoid overlapping efforts and streamline contributions, it is suggested to follow these steps:

1. 检查已接受的问题：
   - 寻找标有类似于 “ACCEPTED” 等的表示准备好作出贡献的问题标签。 如果您对此不确定，您可以在问题评论中询问。

2. 宣布您的意图：
   - 对问题进行评论，说明您正在处理它。 这将有助于防止做出重复的努力。

3. （可选）链接您的贡献：
   - 提交更改时，在您的提交信息中引用问题号，例如，`修复：打字错误。 Ref #123456`。

## 提供翻译

:::注意

在 Github 仓库中提交的翻译拉取请求将不会被接受。

:::

We are using [Crowdin](https://crowdin.com/project/conflux) for document translation integration. Crowdin helps us to know whether translation strings are outdated after the source files are changed. Anyone can submit translation strings in Crowdin, and translation strings will be pushed to Github repo after they are reviewed.

### Crowdin Tutorial

Visit our project page on Crowdin at either https://crowdin.com/project/conflux or https://zh.crowdin.com/project/conflux and select the language you wish to translate.

![languages](../image/2023-04-13-15-54-46.png)

You will be able to select a file to begin translating.

![files](../image/2023-04-13-15-57-59.png)

In order to edit, you will need to be logged in. No need to fret though, you can easily log in with your Github account by clicking a few buttons.

![login](../image/2023-04-13-16-01-17.png)

Once you are in, you can start the translation process! Simply click on a source string on the left-hand panel and input the translation or edited string. Remember to click SAVE and wait for your translation to be reviewed.

![translation](../image/2023-04-13-16-06-44.png)

Once reviewed, the translation string will be pushed to the Github repository and you can visit your translation on the official documentation site.

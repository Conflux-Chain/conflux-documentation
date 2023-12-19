---
sidebar_postion: 6
displayed_sidebar: generalSidebar
---

# 参与贡献

:::info
感谢您对我们文档站点的关注！ 我们非常珍视您的支持，并且很高兴能够听取社区的见解和专业知识。 本页面概述了贡献的指南、流程，以及您所付出的努力可能获得的奖励。

If you are seeking funding from the Conflux Foundation, please refer to our [grants](./build/grants.md) page.

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

要进行贡献，请参考以下建议操作：

### 创建 Issue

您可以通过创建 Issue 以:

- 反馈任何的事实性错误或笔误
- 建议新内容或现有内容的改进

![issue templates](image/2023-04-13-15-16-53.png)

如果您能协助解决相应问题就更好了！

```
// issue 的 BUG 模版
- [ ] I'd be willing to fix this issue myself.
// issue 的 Feature Request 模版
- [ ] I'd be willing to contribute this feature myself
```

### 创建 Pull Request

您可以通过 Pull Request 来提交新内容， ** [翻译](#provide-translation)除外 **.

如果您不是在解决您自己提出的 issue，建议您遵循以下步骤：

:::note
These are not mandatory steps but will decrease the possibility your PR will be rejected.
:::

1. Make sure a relevant open issue with "ACCEPTED" label exists.
2. 在 Issue 中留下评论，防止多人同时处理同一个问题。
3. 在提交信息中提及该 Issue `#xx`。 例`fix: typo. Ref #123456`。


### 提供翻译

:::note

直接在 GitHub 仓库中提交的翻译 PR 将 **不会** 被接受。

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

每季度文档站点建设的参与者将能够铸造贡献者POAP。 但您的贡献内容必须被“接受”，您才能获得铸造资格，这意味着：

- 您创建的任意 issue 需要被管理员添加 "ACCEPTED" 标签
- 您创建的任何 Pull Request 需要被成功合并进主分支
- 或者您提交的任何翻译已通过审核

### 特殊 POAP

除了常规的贡献者 POAP，我们还会铸造特殊 POAP 用于表彰和鼓励重要贡献。 重要贡献包括如：高质量的指南或对项目的持续、频繁的贡献。 特殊 POAP 的颁发由项目维护者根据具体情况决定。

### Poap 发行规则更新

请注意，POAP 发行规则每三个月进行审查并可能进行修改。 这将保证我们的本指导方针能足够有效地鼓励社区为文档建设作出贡献。

我们期待您的贡献，并感谢您帮助我们改进我们的文档网站！ 如果您有任何问题或需要帮助，欢迎随时在我们的 Github 仓库中创建Issue。

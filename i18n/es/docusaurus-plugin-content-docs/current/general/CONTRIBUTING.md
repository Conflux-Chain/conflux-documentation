---
sidebar_postion: 6
displayed_sidebar: generalSidebar
toc_max_heading_level: 4
---

# Contribuir

:::info
¡Gracias por tu interés en contribuir en nuestra documentación! Agradecemos su apoyo y valoramos los conocimientos y la experiencia de nuestra comunidad. Esta página describe las pautas y procesos para contribuir, así como las recompensas que puedes ganar por tus esfuerzos.

If you are seeking funding from the Conflux Foundation for your projects, please refer to our [**Grants**](./build/grants.md) page.

:::

## Cómo contribuir

Las contribuciones son bienvenidas de varias formas, incluyendo pero no limitado a:

1. Señalar una falla/error tipográfico y (opcionalmente) proporcionar una solución
2. Proporcionar una traducción
3. Crear o mejorar diagramas, gráficos o ayudas visuales
4. Sugerir mejoras a la estructura de documentación u organización
5. Escribir o actualizar un tutorial o una guía
6. Crear o actualizar ejemplos de códigos o demos
7. Mejorar la redacción de documentos

To make a contribution, please take one of the following actions:

- **Report an Issue**: If you spot a problem or is willing to suggest improvements, [create an issue](#create-an-issue) to let us know.
- **Submit Changes**: For direct contributions to content, [create a pull request](#create-a-pull-request).
- **Help with Translation**: To contribute translations, please follow our [translation guidelines](#provide-translation).

### Crear un Issue

You can create an issue for the following purposes:

- To report any mistakes or typos.
- To request new content or improvements to current content.

You can typically create an issue directly through the [GitHub web page](https://github.com/Conflux-Chain/conflux-documentation/issues/new/choose). Here, you'll find various templates to guide your issue submission.

![issue templates](image/2023-04-13-15-16-53.png)

If you're able to address the issue yourself, we encourage you to take the initiative. When creating an issue, you can indicate your willingness to resolve it. For bug reports, select the option “I'd be willing to fix this issue myself” in the BUG template. For feature requests, select “I'd be willing to contribute this feature myself” in the Feature Request template.

```md

// in BUG template
- [ ] I'd be willing to fix this issue myself.
// in Feature Request template
- [ ] I'd be willing to contribute this feature myself

```

Alternatively, you can submit your issue through the [Conflux Documentation Issue Form](https://forms.office.com/r/pKVBywZwLY). If your submission is approved, it will be created on the GitHub repository.

![Conflux Documentation Issue Form](image/Conflux%20Documentation%20Issue%20Form.png)

### Crear un Pull Request

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
   - When committing your changes, reference the issue number in your commit message, e.g., `fix: typo. Ref #123456`.

### Proveer traducción

:::note

A translation pull request in the Github repo will NOT be accepted.

:::

Estamos usando [Crowdin](https://crowdin.com/project/conflux) para integrar la traducción de documentos. Crowdin nos ayuda a saber si las traducciones están desactualizadas después de que cambien los archivos de origen. Cualquiera puede enviar traducciones en Crowdin, y las traducciones se colocarán en el repositorio de Github después de que sean revisadas.

#### Tutorial de Crowdin

Visita nuestra página de proyecto en Crowdin en https://crowdin.com/project/nbux o https://zh.crowdin.com/project/nbux y selecciona el idioma que deseas traducir.

![languages](image/2023-04-13-15-54-46.png)

Podrás seleccionar un archivo para empezar a traducir.

![files](image/2023-04-13-15-57-59.png)

Para poder editar, necesitarás iniciar sesión. Puede iniciar sesión fácilmente con su cuenta de Github.

![login](image/2023-04-13-16-01-17.png)

¡Una vez que estés conectado, puedes comenzar el proceso de traducción! Simplemente haga clic en una cadena de origen en el panel de la izquierda e introduzca la traducción o la edición. Recuerde hacer clic en SAVE y espera a que su traducción sea revisada.

![translation](image/2023-04-13-16-06-44.png)

Una vez revisado, la traducción será incluida en el repositorio de Github y puede visitar su traducción en el sitio de documentación oficial.

## POAPs de contribuyentes

After the end of each quarter, we issue a batch of Contributor POAPs (Proof of Attendance Protocol) to recognize individuals who have made contributions to our documentation site. To be eligible for minting a POAP, your contribution must meet the following "ACCEPTED" criteria:

- Creation of an issue that has been labelled "ACCEPTED" by the repo maintainter.
- Successful merging of a Pull Request into the main branch.
- Full review and approval of a translation string.

**POAP Contract Addresses:**

- **Core Space:** [cfx:acd97pbhxm11cegrz3anuuvcuj9j0nh956a108f5cc](https://www.confluxscan.io/address/cfx:acd97pbhxm11cegrz3anuuvcuj9j0nh956a108f5cc)
- **eSpace:** [0x500371e7ec0b5bca911a11964300e694bb0fec9d](https://evm.confluxscan.io/address/0x500371e7ec0b5bca911a11964300e694bb0fec9d)

These POAPs, deployable in both Core Space and eSpace, function as a unified NFT, symbolizing your valuable contribution across the Conflux network.

### POAPs especiales

Además de los POAPs regulares de los contribuyentes, reconocemos y recompensamos contribuciones significativas con POAPs especiales. Ejemplos de contribuciones significativas incluyen guías de alta calidad o contribuciones constantes y frecuentes al proyecto. La decisión de otorgar un POAP especial es tomada caso por caso por los encargados del proyecto.

### FC (FansCoin) Rewards for POAP Holders

As a token of appreciation, contributors can claim [FansCoin (FC)](https://confluxscan.io/token/cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2) rewards for each POAP they own. The amount of FC awarded varies depending on the specific POAP.

> Please note that the FC reward pool is located exclusively in Core Space at [cfx:achm6kb92by13rpvwd04zscn1127zuaseu25usm7sc](https://confluxscan.io/address/cfx:achm6kb92by13rpvwd04zscn1127zuaseu25usm7sc).

### Regular Review of POAP Issuing Rules

Tenga en cuenta que las normas de entrega de POAP están sujetas a revisión y posibles cambios cada 3 meses. Esto garantiza que nuestras directrices sigan siendo relevantes y eficaces para promover y recompensar contribuciones valiosas.

¡Esperamos tus contribuciones y gracias por ayudarnos a mejorar nuestro sitio de documentación! Si tiene alguna pregunta o necesita ayuda, por favor siéntase libre de crear un Issue en nuestro repositorio de Github.

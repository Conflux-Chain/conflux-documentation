---
id: pinata
title: Uploading files to IPFS using Pinata
sidebar_position: 1
keywords:
  - conflux
  - pinata
  - ipfs
  - nft storage
  - file upload
  - decentralized storage
  - content pinning
  - metadata
tags:
  - pinata
  - ipfs
  - nft-storage
  - file-upload
  - decentralized-storage
  - content-pinning
  - metadata-management
  - web3-media
displayed_sidebar: generalSidebar
---

# Uploading files to IPFS using Pinata

The initial phase in establishing an NFT smart contract involves preparing your NFT files. In this instance, the files will be uploaded to **[Pinata](https://www.pinata.cloud/)**, a service that allows you to easily manage and maintain media files on IPFS. If you haven't created an account yet, you can sign-up [here](https://t.sidekickopen86.com/Ctc/RJ+23284/d2q6Hj04/Jk82-6q7W5BW0B06lZ3kSN7N8wZqXqbPzW3TCKPf589Q6FW4CMm433Rb7jyW5KKmWM4jVWNSW1f4SqZ71c-GSW9j-gR-80Z4v9W3K4DpB1nb46WW1CMpy61tWQ0DN3tmTqJq-Wf5W31LKxg3_czldN84Hg68NYPpZW4cZKff1fgZnmW2cBYL08gsKw0W65_dds31pzQFVs9Cdk6Tv5lDW7rrBjl8gNbVJN6Z5JYxhfDJLW4MgBMz7S_jFzf743mLY04).

## What is Pinata?

Pinata is a web3 media management service that allows users to host, manage and share files in IPFS. As an IPFS pinning service, Pinata focuses on giving both technical and non-technical creators a fast, easy, and reliable way to share content without limits.

For developers, Pinata is one of the easiest ways to pin content to IPFS and build web3 applications without having to build and manage your own IPFS nodes. It has done all the heavy lifting for developers.

For creators, Pinata makes it easy to serve content at scale without any technical experience. Pinata offers the ability to start creating without having to worry about the technical side of web3 or IPFS right away.

## What is 'pinning'?

When you “pin” data on an IPFS node, you are telling that node that the data is important, and it should be saved. A node is a program that connects you to IPFS and stores files.

Pinning prevents important data from being deleted from your node. You and only you can control and pin data on your node(s)—you can not force other nodes on the IPFS network to pin your content for you. So, to guarantee your content stays pinned, you have to run your own IPFS nodes.

Once your file is pinned to IPFS, you have full control to share, distribute, monetize and share your files however you’d like.

## Video Tutorial

For a hands-on demonstration on how to use pinata to store your Web3 files, please check out the following video:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="youtube" label="Pinata Video Tutorial">
<iframe width="560" height="315" src="https://www.youtube.com/embed/9y2NK85Z6Hk?si=0TsnWNR40f9mz4Wo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </TabItem>
</Tabs>


## Getting the Images Ready

This guide will focus on creating a single NFT, but if you want to make more, feel free to do so. The image being used can be found here if you'd like to utilize it.

```mdx-code-block

import Image from '@theme/IdealImage';

<Image img={require('./img/0.png')} style={{width: 300}}/>

```

Save your image file in a folder on your computer. Name this image **`0`**, making it the first image retrieved by the smart contract. It will be the first (and only) NFT in this collection; however, if you're adding more images, continue naming them in ascending numerical order. Upload this folder to Pinata once your images are properly organized and named.

:::note
💡 Some projects begin file names with **`0`**, while others with **`1`**. Make sure to be consistent with the smart contract code. We'll name this file **`0`**.
:::

![1.png](./img/1.png)

Upon logging into Pinata, you'll see your dashboard. The upload button is located on the left. Click **`Add Files`**, followed by **`Folder`**.

![2.png](./img/2.png)

Next, select the folder containing the image. You may receive a pop-up from your browser asking you to confirm the folder and its files' upload. If so, click **`Upload`**.

![3.png](./img/3.png)

You'll be asked to name the folder you've uploaded. This is helpful when you have multiple folder sets uploaded to Pinata and need to keep them organized. After naming it, click **`Upload`** and wait for your file to upload. The number and size of the images could impact the upload time, but it should only take a few seconds for a small start.

Once the upload is finished, your folder will appear in your dashboard.

![4.png](./img/4.png)

Clicking on the folder name will take you to the Pinata gateway to view your recently uploaded files. If you have a paid Pinata account, it will open the folder via your own gateway. A paid plan and personal gateway are NOT required for this tutorial but are recommended for larger collection sizes and hosting multiple folders.

Right-click on the image to copy its URL. This URL is crucial. Save it for the next step as we set up the metadata. In this example, the URL is **`https://gateway.pinata.cloud/ipfs/Qmb9WSGE66AJyYpggnxWPvmgHJo3mmyK5eNQJhKUK1ZpQn/0.png`**

## Setting Up the Metadata

With the image uploaded and its URL available, we can create the corresponding metadata file. For this, we will need to (create a JSON file[https://codebeautify.org/blog/how-to-create-json-file/#:~:text=How%20to%20Create%20JSON%20File%3F%201%201.%20Using,3.%20Create%20a%20file%20from%20the%20JSON%20URL]).

As this NFT will be an ERC-721, we know we can utilize metadata standards commonly found on Marketplaces like **[Joepegs.com](https://joepegs.com/)**. The .json file below demonstrates what the **[metadata](https://docs.opensea.io/docs/metadata-standards#metadata-structure)** should resemble.

```
{
  "name": "",
  "tokenId": 0,
  "image": "",
  "description": "",
  "attributes": []
}
```

Now, let's fill in the metadata file values. You can choose any **`name`** and **`description`**.

The **`tokenId`** here will be **`0`** to correspond with the uploaded image. If uploading multiple files, this needs to increment in each file.

Paste the **`image`** link (the URL that was saved earlier) here, so the smart contract knows where to locate the image file for your NFT. If uploading multiple files, the end of the URL (the specific image) needs to increment in each file.

The **`attributes`** field is not as crucial here, but if you were uploading NFTs with multiple layers, the attributes would represent those specific layers' information. This is often employed when determining NFT rarity to rank them based on the frequency of their layers throughout the entire collection. We'll leave it empty in this tutorial.

Below is an example of filling out the fields in the metadata file.

```
{
  "name": "Confi Art",
  "tokenId": 0,
  "image": "https://gateway.pinata.cloud/ipfs/Qmb9WSGE66AJyYpggnxWPvmgHJo3mmyK5eNQJhKUK1ZpQn/0.png",
  "description": "A beaver cartoon inspired in Confi."
}
```

When saving this file, ensure it has the same name as the corresponding image. In this case, it is 0.

After uploading the metadata file to Pinata, the file extension will no longer be necessary. It will search for the file as a directory and extract its information from there. To remove the file extension, follow these steps for a **[Mac](https://support.apple.com/guide/mac-help/show-or-hide-filename-extensions-on-mac-mchlp2304/mac)** environment, or these for a **[Windows](https://www.techwalla.com/articles/how-to-remove-file-extensions)** environment.

Place the file extension-less metadata in a separate folder, just as you did with the image file.

![5.png](./img/5.png)

Now, repeat the folder upload process to add the metadata to Pinata. Follow the same steps as before. Once completed, both folders will be accessible on your dashboard.

![6.png](./img/6.png)

Click on the metadata folder to be directed to the IPFS gateway and save the URL. This URL will be your base URL and won't need the direct file links. The smart contract will append the necessary file information for each NFT as needed. For example, our URL is **`https://gateway.pinata.cloud/ipfs/QmewVNwWYW27gKTrwhDG1Ge1ABqyQGxACCAdpx9a47d3sm`**.



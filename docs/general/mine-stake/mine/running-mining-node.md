---
sidebar_position: 1
title: Running a Mining Node
---

## Conflux Tethys GPU Mining Instruction (v1.1.7)


|  Network  Conflux Tethys    |
| ---------------------- | ----------- |
| Version  | v1.1.7   |  |
| Graphics  | Card Type	NVIDIA GPU      |  
| Graphics Memory	 | *** 8G or more ***    |  
| Install NVIDIA Drivers|[Download](https://www.nvidia.cn/Download/index.aspx?lang=cn)`173` | 

## The content of v1.1.7 upgrade
For details of the v1.1.7 upgrade content, please refer to: https://github.com/Conflux-Chain/conflux-rust/releases `655`

:::note
**Trace data is not compatible with earlier versions of v1.1.1, and the old data may be incorrect. If you use to run the routine executive_trace = true, please clear the data and resynchronize the chain.**
:::

## Windows Testing Instruction
Notes:

1. It is recommended to turn off antivirus softwares.
2. Win 10, version 1903 and above.

## Run Files

1. ** cfxmine.win.zip: mining program:** [Click to see Conflux PoW mining algorithm](https://github.com/Conflux-Chain/open-cfxmine/releases) `660`
2. ** conflux_v1.1.7.zip: Fullnode program:** [Click to see fullnode program](https://github.com/Conflux-Chain/conflux-rust/releases) `655` 

## Prepare to Run conflux
- Create a directory: conflux
- Unzip the download package to the directory respectively

The directory structure is:

```
conflux
└── run
    └── conflux.exe
    └── tethys.toml
└── cfxmine.exe
```

## Configuration Instructions

Open the run/tethys.toml file with a text editor and configure mining related parameters:

```bash
mining_author="Personal wallet address"
```

```
Notice: The wallet address configuration needs to remove the prefix: #
```

Both new and old formats are acceptable.

## Run GPU Mining Program

Conflux GPU Mining Program **cfxmine** needs to run with the Conflux node program. Follow the steps below to start:

- Open the directory of the **run** executable file in cmd, and start the fullnode:

```bash
cd conflux\run
conflux --config tethys.toml --full 2>stderr.txt
```

Then you can start mining.

- Open the cfxmine executable file in cmd, and start the Conflux GPU Mining Program:

```bash
cd conflux
cfxmine --gpu 1
```

Note: The GPU command line is executed after the fullnode synchronization is completed.

## Testing Instruction for Linux

**Run Files**

- **cfxmine.linux.gz:** [Mining ProgramClick to see Conflux PoW Mining Algorithm](https://github.com/Conflux-Chain/open-cfxmine/releases) `660`
- **conflux_linux_v1.1.7:** [Fullnode ProgramClick to see fullnode Program] (https://github.com/Conflux-Chain/conflux-rust/releases)`655`
- （Differences from the previous version: the default.toml in the mainnet release will be renamed as tethys.toml, and in the testnet it will be testnet.toml.）

## Prepare to Run conflux

- Create a directory: conflux
- Unzip the download package to the directory respectively

The directory structure is:

```
conflux
└── run
    └── conflux
    └── tethys.toml
└── cfxmine
```

## Configuration Instructions

Open the `run/tethys.toml` file with a text editor and configure mining related parameters:

```js
mining_author="Personal wallet address"
```
```
Notice: The wallet address configuration needs to remove the prefix: #
```

Both new and old formats are acceptable.

## Run GPU Mining Program

Conflux GPU Mining Program **cfxmine** needs to run with the Conflux node program. Follow the steps below to start:

- In `bash` (or any POSIX compliant Shell), start the fullnode:

```bash
cd conflux/run
./conflux --config tethys.toml --full 2>stderr.txt
```

Then you can start mining.

- Open the directory of the cfxmine executable file in bash (or any POSIX compliant Shell), and start the Conflux GPU miningprogram:

```bash
cd conflux
./cfxmine --gpu 1
```

Note: The GPU command line is executed after the fullnode synchronization is completed

## Tips:

If the Conflux node program and **cfxmine** are not on the same computer, you can specify the IP address and the port (the default is 32525) of the remote Conflux node program when starting cfxmine.

```
./cfxmine --gpu --addr A.B.C.D
```

or

```
./cfxmine --gpu --addr A.B.C.D --port xxxx
```

If you want to designate remote node, you need to change the configuration of the node into:
stratum_listen_address=“0.0.0.0”，and delete #

Note: The GPU command line is executed after the fullnode synchronization is completed.

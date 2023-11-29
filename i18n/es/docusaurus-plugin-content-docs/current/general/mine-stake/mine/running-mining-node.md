---
sidebar_position: 1
title: Running a Mining Node
displayed_sidebar: generalSidebar
---

## Conflux Network PoW - GPU Mining Instruction

Network: Conflux Hydra

Version: v2.2.1-fixpos

Graphics: Card Type NVIDIA GPU

Graphics Memory: 8G or more

Install NVIDIA Drivers: [Download](https://www.nvidia.cn/Download/index.aspx?lang=cn)

## Downloading the latest version
For downloading the latest version of the software, please refer to: https://github.com/Conflux-Chain/conflux-rust/releases


## Windows Testing Instruction
Notes:

1. It is recommended to turn off antivirus softwares.
2. Win 10, version 1903 and above.

## Run Files

1. ** cfxmine.win.zip: mining program:** [Click to see Conflux PoW mining algorithm](https://github.com/Conflux-Chain/open-cfxmine/releases)
2. ** conflux_v2.2.1-fixpos.zip: Fullnode program:** [Click to see fullnode program](https://github.com/Conflux-Chain/conflux-rust/releases)

## Prepare to Run conflux
1. Create a directory named “conflux”
2. Extract the download package to the directory
3. Download the pos_config package and move the decompressed folder to the run directory

:warning: The directory structure should look like this:

```
conflux
└── run
    └── pos_config
    └── conflux.exe
    └── conflux.pdb
    └── hydra.toml
    └── log.yaml
    └── clear_state.bat
    └── clear_state.sh
    └── libcrypto-1_1-x64.dll
    └── libssl-1_1-x64.dll
    └── start.bat
    └── start.sh
    └── throttling.toml
```

Note: the previous tethys.toml has changed to hydra.toml.


## Configuration Instructions

If you only run the PoS node, no modification is required here; If you plan to run the GPU mining software, you need to edit hydra.toml file in order to set up the configuration.

```
# mining_author="cfx:xxxxxxxxxx..."
```

Please change the “cfx:xxxx…” to your own wallet address, and then delete “#” before “mining_author…”


## Run GPU Mining Program

Conflux GPU Mining Program **cfxmine** needs to run with the Conflux node program. Follow the steps below to start:

- Open the directory of the **run** executable file in cmd, and start the fullnode:

```bash
cd conflux\run
conflux --config hydra.toml --full 2>stderr.txt
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

- **cfxmine.linux.gz:** [Mining ProgramClick to see Conflux PoW Mining Algorithm](https://github.com/Conflux-Chain/open-cfxmine/releases)
- **conflux_linux_v2.2.1-fixpos:** \[Fullnode ProgramClick to see fullnode Program\] (https://github.com/Conflux-Chain/conflux-rust/releases)
- （Differences from the previous version: the default.toml in the mainnet release will be renamed as tethys.toml, and in the testnet it will be testnet.toml.）

## Prepare to Run conflux

1. Create a directory named “conflux”
2. Extract the download package to the directory
3. Download the pos_config package and move the decompressed folder to the run directory

:warning: The directory structure should look like this:

```
conflux
└── run
    └── pos_config
    └── conflux.exe
    └── conflux.pdb
    └── hydra.toml
    └── log.yaml
    └── clear_state.bat
    └── clear_state.sh
    └── libcrypto-1_1-x64.dll
    └── libssl-1_1-x64.dll
    └── start.bat
    └── start.sh
    └── throttling.toml
```

Note: the previous tethys.toml has changed to hydra.toml.

## Configuration Instructions

Open the `run/hydra.toml` file with a text editor and configure mining related parameters:

```
# mining_author="cfx:xxxxxxxxxx..."
```

Please change the “cfx:xxxx…” to your own wallet address, and then delete “#” before “mining_author…”


## Run GPU Mining Program

Conflux GPU Mining Program **cfxmine** needs to run with the Conflux node program. Follow the steps below to start:

- In `bash` (or any POSIX compliant Shell), start the fullnode:

```bash
cd conflux/run
./conflux --config hydra.toml --full 2>stderr.txt
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

If you want to designate remote node, you need to change the configuration of the node into: stratum_listen_address=“0.0.0.0”，and delete #

Note: The GPU command line is executed after the fullnode synchronization is completed.

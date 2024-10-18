---
sidebar_position: 3
title: GHAST
displayed_sidebar: generalSidebar
keywords:
  - Conflux-Network
  - GHAST
  - Greedy-Heaviest-Adaptive-SubTree
  - consensus-mechanism
  - liveness-attack
  - heaviest-chain-rule
  - block-weight
  - Tree-Graph-structure
  - special-blocks
  - normal-blocks
  - mining-difficulty
tags:
  - Proof-of-Work
  - GHAST
---

GHAST (Greedy-Heaviest-Adaptive-SubTree)

Conflux Research Group ha desarrollado el mecanismo GHAST para abordar la cuestión del "liveness attack". El mecanismo consiste en aplicar la regla de cadena más pesada pero con un sistema de pesos de bloque modificado. El tipo de bloque se decide en base a la estructura tree-graph histórica del bloque, no a la discreción del minero. Con el mecanismo GHAST, la regla de la cadena más pesada se aplica seleccionando el bloque hijo con el peso más alto del árbol hijo del último bloque de la cadena principal. El cálculo del peso del bloque para el subárbol ya no se basa únicamente en el recuento de bloques sino también en la suma de los pesos. El mecanismo GHAST, permitiendo a los mineros generar bloques especiales, aumenta la dificultad del bloque y ralentiza la velocidad de producción del bloque, lo que ayuda a resolver el problema del "liveness attack".

Las partes centrales del mecanismo GHAST pueden resumirse de la siguiente manera:

Se aplica la regla de cadena más pesada, pero el bloque tiene tres pesos diferentes: 0, 1, X. Cuando X es un número relativamente grande, por ejemplo X = 1000 (ignorando la situación que implica el ajuste de dificultad minera).

Hay dos tipos de bloques en la red: bloques normales y bloques especiales. El peso del bloque normal es siempre 1; el peso del bloque especial se determina de acuerdo a la dificultad del bloque — hay pesas de bloque especial 1/X de X, mientras que el resto son 0. Minar un bloque normal tiene la misma dificultad que un bloque especial.

El tipo de bloque está determinado por la estructura histórica del tree-graph Puesto que el generador de un bloque no puede especificar arbitrariamente el tipo de bloque.

En ausencia de un ataque, todos los bloques honestos recién generados deberían convertirse en bloques normales; después de que el atacante lleve a cabo cualquier tipo de “liveness attack” y continúe durante un tiempo suficiente, todos los bloques honestos recién generados se convierten en bloques especiales.

### **Getting started**
- clone the project: 
```shell
  git clone git@github.com:ur-org/abra_front.git
```
- if you haven't installed **yarn** yet, please [install](https://yarnpkg.com)
- switch to **dev** branch: 
```shell
  git checkout dev
```
- install project dependencies: 
```shell
  yarn
```
- run the project: 
```shell
  yarn start
```
- the project is hosting and available on http://localhost:3000
<br />
<br />
<br />


### **Development**
- all development is focused in **dev** branch
- to start your task you have to create a new branch from the **dev** branch. A name for this branch gotta reflect your current task. When the task is done you must commit to your current branch, then switch to **dev** and pull all changes from it. Resolve merge conflicts, if there are any. Then create a new **pull request**.<br />
❗ Don't forget to check if you're actually pointing to the **dev** branch!
- if you need to install a third-party library, type: 
```shell
  yarn add <название библиотеки>
```
- Follow [this guide](https://www.conventionalcommits.org/en/v1.0.0/) to write the commit messages in the right way! <br />
Briefly: add prefixes to the commit names, start them with a small letter and put the colon with the space (`': '`) after it at the end.<br />
For example:
  + **feat:** – new feature implemented (added footer, product card, some api request or component logic etc.)
  + **fix:** – fixed some error(s).
  + **refactor:** – removed, added or moved files, edited code formatting (white-space, formatting, missing semi-colons, etc), improved some algorithms etc.
<br />
<br />

  See more prefixes in the guide above.
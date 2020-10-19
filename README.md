Jekyll site for Streaming.StarWarsCCG.org
=========================================





### [Automated by GitHub Actions](https://github.com/swccgpc/streaming-website/actions?query=workflow%3A%22Deploy+streaming%22)

* The site is published automatically when code is merged in to the [`main` branch on GitHub](https://github.com/swccgpc/streaming-website).
* Code should be reviewed by the site ownership.
* To make a contribution:
  1. Fork the site.
  1. Create a pull request
  1. Mark the site owners as approvers
  1. The site owners will audit the contribution and approve, _or deny_, the pull request.
  1. After approval, the site update will automatically be posted.



## Requirements for editing the site

### For editing HTML files-only

* Just a text editor like that respects UNIX newline characters and won't insert a bunch of Windows return chars or old Mac line-endings.
* Decent editors would include things like: **vim**, **nano**, **[Atom](http://atom.io)**, or **[Sublime Text](http://www.sublimetext.com/)**

* If you are looking for a WYSIWYG editor for markdown, the language of the `.md` files, use [Typora](https://typora.io/)





### Required for building and serving locally 

* The site is built using **[Jekyll](https://jekyllrb.com/)**, *the static website builder*.
* Jekyll allows the site to built dynamically, but served statically.
* A static site makes it easy to host, on something like **AWS S3+CloudFront.**
* The static site is lightning fast to load as there isn't any server-side processing of the page.
* ***To build the site you will need to have Jekyll installed.***
* Jekyll is a ruby-based app, so **Ruby will need to be installed** to support Jekyll.

```bash

gem install bundler jekyll

```


### Jekyll can serve the site

```bash
jekyll serve
```

* After running the **serve** command, Jekyll will start a webserver running on port 4000.
* Point your web browser to http://0.0.0.0:4000/ to view the site.




## Making changes to, or adding, pages:
* All page content is stored in the `_pages` directory.
* Files can be markdown files, ending in `.md`, or html files ending in `.html`

```
_pages
├── streaming
│   └── how-to-stream.md
├── streaming.md
└── what-is-gemp.md
```

* At the top of a page is **frontmatter**. Frontmatter includes a few key attributes:
  * `layout`, which is the theme. The theme should always be `swccgpc`.
  * `title`, which is the title showed on the page.
  * `permalink`, which is the permanent link to the page.
  * `published`, an optional value that can control whether or not a page is displayed. This option can be used for taking old content offline or for keeping new content from appearing on the page.

```yaml
---
layout: swccgpc
title: Streaming
published:true
permalink: /streaming/
---
```

## Blog posts
* Jekyll includes support for blog posts.
* To start there are no blog posts so there are no blog pages displayed.
* All blog content is stored in the `_posts` directory.
* Files can be markdown files, ending in `.md`, or html files ending in `.html`
* Blog posts must be named: `YYYY-MM-DD-title.md`.<br />For example: `2020-10-18-We_Launched_Our_New_SWCCG_Streaming_Site.md`.
* The **frontmatter** resembles that of the **pages** _(above)_ but also includes some additional attributes:
  * `description`
  * `date`, which should follow the `YYYY-MM-DD` format.
  * `categories`, which is a list of category tags that apply to the blog post.

```yaml
---
layout: swccgpc
title: We Launched Our New SWCCG Streaming Site!
description: A new site to cover all aspects of streaming the game and how to get it done.
date: 2020-10-18
published: true
categories:
  - swccg
  - gemp
  - blog
  - streaming
---
```





## Making changes to the Navigation Bar

* The data for _what_ goes in to the navigation bar come from `_config.yml`.
* edit `_config.yml` appropriately and the primary navigation will change.












## Sync a fork of a repository to keep it up-to-date with the upstream repository.

### This BIG-gotcha difference between Stash Bitbucket and GitHub

* BitBucket auto-syncs repo changes from the original to the forked repo.
* Which means once we merge something, everybody gets it automatically and just pulls the latest.
* However, GitHub **does not** do that.
* So your personal fork can get out of sync
* The instructions below will allow you to resync from the upstream master.

### Configure a remote for a fork

* Before you can sync your fork with an upstream repository, you must configure a remote that points to the upstream repository in Git.
* You must configure a remote that points to the upstream repository in Git to sync changes you make in a fork with the original repository.
* This also allows you to sync changes made in the original repository with the fork.

```bash
##
## List the current configured remote repository for your fork.
##
git remote -v

# origin  git@github.com:DevoKun/streaming-website.git (fetch)
# origin  git@github.com:DevoKun/streaming-website.git (push)

##
## Specify a new remote upstream repository that will be synced with the fork.
##
git remote add upstream git@github.com:swccgpc/streaming-website.git

##
## Verify the new upstream repository you've specified for your fork.
##
git remote -v

# origin    git@github.com:DevoKun/streaming-website.git (fetch)
# origin    git@github.com:DevoKun/streaming-website.git (push)
# upstream  git@github.com:swccgpc/streaming-website.git (fetch)
# upstream  git@github.com:swccgpc/streaming-website.git (push)
```

### Fetch from upstream and merge to local master

```bash
git fetch upstream

##
## If not on master, switch to master
## master is not the same as upstream/master
## upstream/master is on github
## master is local to your laptop
##
git branch
git checkout master
git branch
git merge upstream/master
```

### Create a script to resync the branch for you

* Create the file: ~/bin/gitresync
* The contents will be:

```bash
git remote -v

git fetch upstream
git branch
git checkout master
git branch
git merge upstream/master
```


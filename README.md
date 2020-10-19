Jekyll site for Streaming.StarWarsCCG.org
=========================================


## Install Jekyll

```bash
gem install jekyll
```

## Run server locally

```bash
jekyll serve
```

* And visit http://0.0.0.0:4000/



## Website publishing

```bash

export AWS_PROFILE="swccg-production"
jekyll build
s3_website push

```






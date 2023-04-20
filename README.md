# test-blog

A proof of concept for a Micro.blog test suite. Born out of the dream:

> As a theme developer I want to feel comfortable my theme is Micro.blog compatible. For example:
>
> * that required Microformats are present
> * custom footer content is there
> * external JavaScript and CSS files are included

In this repository, a potential solution is explored. It consists of:

* three example tests in the `tests` directory
* a mockup `config.json`…
* and the default `blank` theme (to simulate the Micro.blog environment)
* mockup pages, posts, and files in the `content` and `static` directories

## How to run the tests on your theme

Here's how to get up to speed on a machine running macOS with `brew` installed. First things first, to run the tests you will need to install:

* `hugo` to build the test blog
* `deno` to run the tests

To match the production environment, we will install Hugo 0.91.0 via my homebrew tap. The binary will be named `hugo91`. If you install Hugo in another way, be aware that the usage of `hugo91` below probably should be changed to just `hugo`.

```sh
brew install svendahlstrand/tap/hugo@0.91.0
brew install deno
```

Then, change directory to the theme you want to test, download, and extract the test suite.

```sh
cd ~/projects/theme-marfa
curl -Lo test-blog.zip https://github.com/svendahlstrand/test-blog/archive/refs/heads/main.zip
unzip test-blog.zip
rm test-blog.zip
mv test-blog-main test-blog
```

Now, change directory to the newly extracted one, build the test blog, and run the tests.

```sh
cd test-blog
hugo91
deno test --allow-read
```

Hopefully, the test runs and you should see something like this:

![](https://github.com/svendahlstrand/test-blog/raw/main/docs/example-test-run.png)

For this particular example, two tests passed and one failed. Looks like Microformats are missing from the homepage.
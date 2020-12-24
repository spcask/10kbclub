10 KB Club
==========

This is the source code of [10kbclub.com][website].

[website]: https://10kbclub.com/


Contents
--------

* [Suggest New Website](#suggest-new-website)
* [Development Setup](#development-setup)
* [Contribution Guidelines](#contribution-guidelines)
* [Additional Details](#additional-details)
* [License](#license)
* [Support](#support)


Suggest New Website
-------------------

Read the [Club Rules][rules] first. If the new website satisfies the
club rules, then [create a new issue][new issue] and provide the URL of
the website.

[rules]: https://10kbclub.com/#club-rules
[new issue]: https://github.com/susam/10kbclub/issues/new


Development Setup
-----------------

To build and develop this project locally, perform the following steps:

 1. Install Node.

    On macOS, enter the following command if you have
    [Homebrew](https://brew.sh):

    ```sh
    brew install node
    ```

    On Debian, Ubuntu, or another Debian-based Linux system, enter the
    following command:

    ```
    sudo apt-get install nodejs
    ```

 2. Clone this repository:

    ```sh
    git clone https://github.com/susam/10kbclub.git
    ```

 3. Initialize the repository with NPM `node_modules`:

    ```sh
    cd 10kbclub
    npm install
    ```

 4. Enter the following command to update [`metrics.json`] file with
    metrics data for each URL specified in [`urls.txt`]:

    ```sh
    node refresh.js
    ```

 5. Enter the following command to render an updated [`index.html`] with
    using the data in [`metrics.json`]:

    ```sh
    node render.js
    ```

 6. Now open [`index.html`] using a web browser to see the output.


Contribution Guidelines
-----------------------

If you plan to make bug fixes or enhancements to this project and submit
a pull request, please follow these guidelines:

 1. Ensure that there are no changes to [`index.html`] or
    [`metrics.json`] in the pull request. These are automatically
    generated files. They will be generated and pushed to
    [10kbclub.com][website] automatically during the next build.

 2. Run the following command to ensure that the changes conform to the
    project's coding conventions:

    ```sh
    npm run lint
    ```

 3. Write the commit message properly as per the guidelines in this
    document: [Writing Good Commit Messages][commit-conventions].

[`metrics.json`]: metrics.json
[`urls.txt`]: urls.txt
[`index.html`]: index.html
[commit-conventions]: https://github.com/erlang/otp/wiki/Writing-good-commit-messages


Additional Details
------------------

This section contains some additional details that might be useful in
understanding this project.

 1. The project repository at https://github.com/susam/10kbclub is
    automatically published as https://10kbclub.com/ using [GitHub
    Pages][gh-pages].

 2. The files [`index.html`] and [`metrics.json`] get updated
    automatically once a day at 00:00:00 UTC as well as on every push
    via GitHub Actions. See [`publish.yml`] for the GitHub Actions
    workflow. See https://github.com/susam/10kbclub/actions for the
    previous executions of the workflow.

[gh-pages]: https://pages.github.com/
[`publish.yml`]: .github/workflows/publish.yml
[actions]: https://github.com/susam/10kbclub/actions


License
-------

This is free and open source software. You can use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of it,
under the terms of the MIT License. See [LICENSE.md][L] for details.

This software is provided "AS IS", WITHOUT WARRANTY OF ANY KIND,
express or implied. See [LICENSE.md][L] for details.

[L]: LICENSE.md


Support
-------

To report bugs, suggest improvements, or ask questions,
[create issues][ISSUES].

[ISSUES]: https://github.com/susam/10kbclub/issues

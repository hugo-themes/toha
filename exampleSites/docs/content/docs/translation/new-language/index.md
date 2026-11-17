---
title: How to add an unsupported language
date: '2024-01-15T06:20:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Adding new language
weight: 510
aliases:
  - /posts/translation/new-language/
---

If you want to translate to an unsupported language, you can translate the UI elements.

## Create an `i18n` file

To do so, you have to create the `i18n` diretory inside the root of the site, the directory where you can find the `hugo.yaml` file, and directories like `data`, `content`, etc.

Afterwards, you can create the file `<language_code>.toml` into the `i18n` directory. In this [directory](https://github.com/hugo-toha/hugo-toha.github.io/tree/gh-pages/flags/1x1), you can find all language codes with the flag that will appear with that code.

## Translate the UI elements

Inside the new file, just copy the following content, and replace the content between the quotation marks with the name in your desired language.

{{< alert type="warning" >}}
If the content below gets obsolete, you can copy the contents from the [en](https://github.com/hugo-toha/toha/blob/main/i18n/en.toml) file.
{{< /alert >}}

```toml
# More documentation here: https://github.com/nicksnyder/go-i18n
[home]
other = "Home"

[posts]
other = "Posts"

[toc_heading]
other = "Table of Contents"

[tags]
other = "Tags"

[categories]
other = "Categories"

[at]
other = "at"

[resume]
other = "My resume"

[navigation]
other = "Navigation"

[contact_me]
other = "Contact me:"

[email]
other = "Email"

[phone]
other = "Phone"

[newsletter_text]
other = "Stay up to date with email notification"

[newsletter_input_placeholder]
other = "Enter email"

[newsletter_warning]
other = "By entering your email address, you agree to receive the newsletter of this website."

[submit]
other = "Submit"

[hugoAttributionText]
other = "Powered by"

[prev]
other = "Prev"

[next]
other = "Next"

[share_on]
other = "Share on"

[improve_this_page]
other = "Improve this page"

[out_of]
other = "out of"

[publications]
other = "Publications"

[taken_courses]
other = "Taken Courses"

[course_name]
other = "Course Name"

[total_credit]
other = "Total Credit"

[obtained_credit]
other = "Obtained Credit"

[extracurricular_activities]
other = "Extracurricular Activities"

[show_more]
other = "Show More"

[show_less]
other = "Show Less"

[responsibilities]
other = "Responsibilities:"

[present]
other = "Present"

[comments_javascript]
other = "Please enable JavaScript to view the"

[comments_by]
other = "comments powered by"

[read]
other = "Read"

[project_star]
other = "Star"

[project_details]
other = "Details"

[err_404]
other = "The page you are looking for is not there yet."

[more]
other = "More"

[view_certificate]
other = "View Certificate"

[notes]
other = "Notes"

[disclaimer_text]
other = "Liability Notice"

[search]
other = "Search"

[minute]
one = "minute"
other = "minutes"
```

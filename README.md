# Grunt Template
Web Development with Grunt, Grunt Templating Task and SCSS.

## Set Up
1. Clone This
2. `mv /path/to/repo/grunt-project /path/to/repo/{Project Name}`
3. cd into the project
4. `rm -rf .git`
5. `git init`
6. Add the new repo `git remote add origin {new git repo}`
7. `git push -u origin master`
8. run `npm install` (sudo if you get any access errors)
9. run `grunt` for all the goodness

## Grunt Plugins
- Clean
- Copy
- Sass
- Watch
- Browser Sync
- scss lint
- html hint
- csslint
- git deploy
- Template (From Sorin)

## Grunt Tasks
- `build` compiles SCSS and Template Files
- ` ` default task
- `htmllint` runs `template` and `htmllint`
- `git_deploy` uploads `build` to github pages
- `watch` watches `template/` and `scss` and compiles changes

## Grunt Default Task
- `clean` `/build/`
- `copy` `'img/, js/ and svg/` into `build`
- `build`
- `browserSync` runs server and pushes changes
- `watch` ... watches.

## Deploying to Github Pages
Upload the current `/buiild` folder to Github Pages

Change the `git_deploy` task options to the url for your repo.
```
url: 'git@github.com:{YOUR/URL.git}
```

## Editing HTML
Your HTML templates will go in `templates/` and you can add your chunks to your template with
```
<%= include('include/{yourfile}.html') %>
```

### Variables in your includes
Add variables in the files you want to include like this
```
<%= var %>
```

Call your variables in your template like this
```
<%= include('include/{file}', {
  var: "content"
}) %>





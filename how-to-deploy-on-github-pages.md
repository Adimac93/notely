# How to deploy

git init\
git add .\
git commit -m "initial commit"\
git branch -M main\
git remote add origin *git-url/*_project-name/_.git\
git push -u origin main\

vite.config.ts -> base: _/project-name/_\
npm run build\
git add dist -f\
git commit -m "adding dist"\
git subtree push --prefix dist origin gh-pages\
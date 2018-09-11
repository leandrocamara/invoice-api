
const gulp = require('gulp')
const clean = require('gulp-clean')
const ts = require('gulp-typescript')

const tsProject = ts.createProject('tsconfig.json')

// Tarefa executada após a tarefa 'static'.
gulp.task('scripts', ['static'], () => {
  // Compila o código-fonte 'typescript'.
  const tsResult = tsProject.src()
    .pipe(tsProject())

  // Move os arquivos gerados (javascript) para o diretório 'dist'.
  return tsResult.js
    .pipe(gulp.dest('dist'))
})

// Tarefa executada após a tarefa 'clean'.
gulp.task('static', ['clean'], () => {
  // Move os arquivos estáticos (json) para o diretório 'dist'.
  return gulp
    .src(['src/**/*.json'])
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', () => {
  // Remove do 'build' gerado os arquivos excluídos da aplicação.
  return gulp
    .src('dist')
    .pipe(clean())
})

// Chama as demais tarefas na ordem correta.
gulp.task('build', ['scripts'])

gulp.task('watch', ['build'], () => {
  // Escuta/observa as alterações nos arquivos '.ts' e '.json', executando a tarefa 'build'.
  return gulp.watch(['src/**/*.ts', 'src/**/*.json'], ['build'])
})

gulp.task('default', ['watch'])

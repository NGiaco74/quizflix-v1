#!/usr/bin/env node

/**
 * Script de vérification du projet Quizflix V1
 * Vérifie que tous les fichiers essentiels sont présents
 */

const fs = require('fs');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, optional = false) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log(`✅ ${filePath}`, 'green');
    return true;
  } else {
    if (optional) {
      log(`⚠️  ${filePath} (optionnel)`, 'yellow');
    } else {
      log(`❌ ${filePath} MANQUANT`, 'red');
    }
    return !optional;
  }
}

function checkDirectory(dirPath) {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  if (exists) {
    log(`✅ ${dirPath}/`, 'green');
    return true;
  } else {
    log(`❌ ${dirPath}/ MANQUANT`, 'red');
    return false;
  }
}

function countQuizzes(locale) {
  let count = 0;
  const categories = ['movie', 'tv', 'game'];
  
  for (const category of categories) {
    const dir = path.join('data', locale, category);
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
      count += files.length;
    }
  }
  
  return count;
}

log('\n🔍 Vérification du projet Quizflix V1\n', 'blue');

let allGood = true;

// Configuration
log('📋 Fichiers de configuration:', 'blue');
allGood = checkFile('package.json') && allGood;
allGood = checkFile('tsconfig.json') && allGood;
allGood = checkFile('tailwind.config.ts') && allGood;
allGood = checkFile('next.config.mjs') && allGood;
allGood = checkFile('postcss.config.mjs') && allGood;
allGood = checkFile('middleware.ts') && allGood;

// i18n
log('\n🌍 Internationalisation:', 'blue');
allGood = checkFile('lib/i18n.ts') && allGood;
allGood = checkFile('i18n/messages/fr.json') && allGood;
allGood = checkFile('i18n/messages/en.json') && allGood;

// Utilitaires
log('\n🛠️  Utilitaires:', 'blue');
allGood = checkFile('lib/types.ts') && allGood;
allGood = checkFile('lib/quiz.ts') && allGood;
allGood = checkFile('lib/seo.ts') && allGood;
allGood = checkFile('lib/random.ts') && allGood;

// Styles
log('\n🎨 Styles:', 'blue');
allGood = checkFile('styles/globals.css') && allGood;

// Composants
log('\n🧩 Composants:', 'blue');
allGood = checkFile('components/Header.tsx') && allGood;
allGood = checkFile('components/Footer.tsx') && allGood;
allGood = checkFile('components/LanguageSwitcher.tsx') && allGood;
allGood = checkFile('components/BadgeCategory.tsx') && allGood;
allGood = checkFile('components/QuizCard.tsx') && allGood;
allGood = checkFile('components/Quiz.tsx') && allGood;
allGood = checkFile('components/ProgressBar.tsx') && allGood;
allGood = checkFile('components/ResultCard.tsx') && allGood;
allGood = checkFile('components/ShareButtons.tsx') && allGood;

// Pages
log('\n📄 Pages:', 'blue');
allGood = checkFile('app/layout.tsx') && allGood;
allGood = checkFile('app/not-found.tsx') && allGood;
allGood = checkFile('app/[locale]/layout.tsx') && allGood;
allGood = checkFile('app/[locale]/page.tsx') && allGood;
allGood = checkFile('app/[locale]/quiz/[slug]/page.tsx') && allGood;
allGood = checkFile('app/[locale]/result/[slug]/page.tsx') && allGood;
allGood = checkFile('app/[locale]/jeux-video/page.tsx') && allGood;
allGood = checkFile('app/[locale]/games/page.tsx') && allGood;
allGood = checkFile('app/[locale]/legal/privacy/page.tsx') && allGood;
allGood = checkFile('app/[locale]/legal/cookies/page.tsx') && allGood;

// API Routes
log('\n🌐 Routes API:', 'blue');
allGood = checkFile('app/api/og/route.tsx') && allGood;
allGood = checkFile('app/robots.txt/route.ts') && allGood;
allGood = checkFile('app/sitemap.xml/route.ts') && allGood;
allGood = checkFile('app/sitemap-fr.xml/route.ts') && allGood;
allGood = checkFile('app/sitemap-en.xml/route.ts') && allGood;

// Données
log('\n📊 Données des quiz:', 'blue');
allGood = checkDirectory('data/fr/movie') && allGood;
allGood = checkDirectory('data/fr/tv') && allGood;
allGood = checkDirectory('data/fr/game') && allGood;
allGood = checkDirectory('data/en/movie') && allGood;
allGood = checkDirectory('data/en/tv') && allGood;
allGood = checkDirectory('data/en/game') && allGood;

const frCount = countQuizzes('fr');
const enCount = countQuizzes('en');

log(`\n📈 Statistiques des quiz:`, 'blue');
log(`   Français: ${frCount} quiz`, frCount >= 3 ? 'green' : 'yellow');
log(`   Anglais: ${enCount} quiz`, enCount >= 3 ? 'green' : 'yellow');

if (frCount < 3 || enCount < 3) {
  log('   ⚠️  Il est recommandé d\'avoir au moins 3 quiz par langue', 'yellow');
}

// Documentation
log('\n📚 Documentation:', 'blue');
checkFile('README.md', false);
checkFile('QUICKSTART.md', true);
checkFile('CONTRIBUTING.md', true);
checkFile('PROJECT_SUMMARY.md', true);
checkFile('INSTRUCTIONS_FR.md', true);

// Résultat final
log('\n' + '='.repeat(50), 'blue');
if (allGood && frCount >= 3 && enCount >= 3) {
  log('✅ PROJET COMPLET ET PRÊT !', 'green');
  log('\nPour démarrer:', 'blue');
  log('  npm install', 'yellow');
  log('  npm run dev', 'yellow');
  log('\nPuis visitez: http://localhost:3000/fr', 'blue');
} else {
  log('⚠️  ATTENTION: Certains fichiers sont manquants', 'yellow');
  log('\nConsultez les fichiers marqués ❌ ci-dessus', 'red');
}
log('='.repeat(50) + '\n', 'blue');

process.exit(allGood ? 0 : 1);



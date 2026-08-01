import type { LangCode } from '../types/language'

type UiKey =
  | 'appName'
  | 'tagline'
  | 'chooseTarget'
  | 'comingSoon'
  | 'back'
  | 'asLearner'
  | 'hearPronunciation'
  | 'correct'
  | 'wrong'
  | 'next'
  | 'score'
  | 'restart'
  | 'noMoreQuestions'
  | 'categories'
  | 'startCategory'
  | 'emptyCategory'
  | 'languageHubLead'
  | 'languageHubMenuHint'
  | 'overview'
  | 'roundResult'
  | 'perfectRound'
  | 'retryMissed'
  | 'missedSummary'
  | 'yourAnswer'
  | 'correctAnswer'
  | 'tapToContinue'
  | 'enterToContinue'
  | 'typeCharacter'
  | 'checkAnswer'
  | 'openTable'
  | 'close'
  | 'vocabGrade'
  | 'vocabMode'
  | 'vocabModeReading'
  | 'vocabModeMeaning'
  | 'vocabCount'
  | 'jlptHubLead'
  | 'jlptHubMeta'
  | 'jlptBackToHub'
  | 'jlptPrevDay'
  | 'jlptNextDay'
  | 'contributeTitle'
  | 'contributeLead'
  | 'contributeCta'

const EN: Record<UiKey, string> = {
  appName: 'LangStart',
  tagline: 'First words. Every language.',
  chooseTarget: 'Pick a language to start',
  comingSoon: 'Coming soon',
  back: 'Back',
  asLearner: 'Your language',
  hearPronunciation: 'Pronunciation',
  correct: 'Correct!',
  wrong: 'Not quite',
  next: 'Next',
  score: 'Score',
  restart: 'Restart',
  noMoreQuestions: 'You finished this set!',
  categories: 'Categories',
  startCategory: 'Start quiz',
  emptyCategory: 'No cards in this category yet.',
  languageHubLead: 'Start with the basics — the must-memorize steps for beginners.',
  languageHubMenuHint:
    'On mobile, tap the three lines at the top left to open the category menu.',
  overview: 'Overview',
  roundResult: 'Round {n} results',
  perfectRound: 'Perfect — all correct!',
  retryMissed: 'Retry {n} missed',
  missedSummary: '{correct} correct · {missed} missed. Retry the ones you missed.',
  yourAnswer: 'You',
  correctAnswer: 'Answer',
  tapToContinue: 'Tap to continue',
  enterToContinue: 'Press Enter or tap to continue',
  typeCharacter: 'Type the sound',
  checkAnswer: 'Check',
  openTable: 'Table',
  close: 'Close',
  vocabGrade: 'School grade',
  vocabMode: 'Quiz mode',
  vocabModeReading: 'Reading',
  vocabModeMeaning: 'Meaning',
  vocabCount: 'Questions',
  jlptHubLead:
    'A larger vocabulary track — separate from the short must-memorize basics. Pick a level, then a day (~20 words).',
  jlptHubMeta: '{days} days · {words} words',
  jlptBackToHub: 'All JLPT levels',
  jlptPrevDay: 'Previous day',
  jlptNextDay: 'Next day',
  contributeTitle: 'Help build LangStart',
  contributeLead:
    'Open source — fix sounds, translations, or tables, or help add a language. Contributors welcome.',
  contributeCta: 'View on GitHub',
}

export const UI_STRINGS: Record<LangCode, Partial<Record<UiKey, string>>> = {
  en: EN,
  ko: {
    appName: 'LangStart',
    tagline: '시작할 때 꼭 외울 것들.',
    chooseTarget: '배우고 싶은 언어를 고르세요',
    comingSoon: '준비 중',
    back: '뒤로',
    asLearner: '내 언어',
    hearPronunciation: '발음',
    correct: '정답!',
    wrong: '아쉬워요',
    next: '다음',
    score: '점수',
    restart: '다시 하기',
    noMoreQuestions: '이 세트를 모두 풀었어요!',
    categories: '카테고리',
    startCategory: '퀴즈 시작',
    emptyCategory: '아직 이 카테고리 카드가 없어요.',
    languageHubLead: '기초부터 시작하세요. 외우기 귀찮지만 꼭 필요한 목차입니다.',
    languageHubMenuHint:
      '모바일에서는 왼쪽 위 작대기 세 개를 눌러 카테고리 메뉴를 여세요.',
    overview: '개요',
    roundResult: '{n}라운드 결과',
    perfectRound: '완벽해요. 전부 정답입니다!',
    retryMissed: '오답 {n}개 다시 풀기',
    missedSummary: '정답 {correct}개 · 오답 {missed}개. 틀린 문제만 다시 풉니다.',
    yourAnswer: '내 답',
    correctAnswer: '정답',
    tapToContinue: '탭해서 계속',
    enterToContinue: '엔터 또는 탭해서 계속',
    typeCharacter: '소리를 입력하세요',
    checkAnswer: '확인',
    openTable: '표',
    close: '닫기',
    vocabGrade: '학년',
    vocabMode: '퀴즈 모드',
    vocabModeReading: '읽기',
    vocabModeMeaning: '의미',
    vocabCount: '문제 수',
    jlptHubLead:
      '기초 팩과 별개인 큰 어휘 드릴입니다. 급수를 고른 뒤 Day(~20단어)를 선택하세요.',
    jlptHubMeta: '{days}일 · {words}단어',
    jlptBackToHub: 'JLPT 급수 목록',
    jlptPrevDay: '이전 Day',
    jlptNextDay: '다음 Day',
    contributeTitle: 'LangStart를 함께 만들어요',
    contributeLead:
      '오픈소스입니다. 발음·번역·표 수정이나 새 언어 추가에 기여해 주세요.',
    contributeCta: 'GitHub에서 보기',
  },
  ja: {
    appName: 'LangStart',
    tagline: 'はじめに覚える、あの基礎。',
    chooseTarget: '学びたい言語を選んでください',
    comingSoon: '準備中',
    back: '戻る',
    asLearner: 'あなたの言語',
    hearPronunciation: '発音',
    correct: '正解！',
    wrong: '残念',
    next: '次へ',
    score: 'スコア',
    restart: 'もう一度',
    noMoreQuestions: 'このセットをクリアしました！',
    categories: 'カテゴリー',
    startCategory: 'クイズを始める',
    emptyCategory: 'このカテゴリーにはまだカードがありません。',
    languageHubLead: 'まず基礎から。覚えるのは面倒でも必須のメニューです。',
    languageHubMenuHint:
      'モバイルでは左上の三本線をタップしてカテゴリーメニューを開きます。',
    overview: '概要',
    roundResult: '{n}ラウンドの結果',
    perfectRound: 'パーフェクト！全部正解です',
    retryMissed: '間違えた {n}問をもう一度',
    missedSummary: '正解 {correct} · 不正解 {missed}。間違えた問題だけもう一度。',
    yourAnswer: 'あなたの答え',
    correctAnswer: '正解',
    tapToContinue: 'タップして続く',
    enterToContinue: 'Enter かタップで続く',
    typeCharacter: '読みを入力',
    checkAnswer: '確認',
    openTable: '表',
    close: '閉じる',
    vocabGrade: '学年',
    vocabMode: 'クイズモード',
    vocabModeReading: '読み',
    vocabModeMeaning: '意味',
    vocabCount: '問題数',
    jlptHubLead:
      '短い基礎パックとは別の、大きめの語彙ドリルです。級を選んでから Day（約20語）を選んでください。',
    jlptHubMeta: '{days}日 · {words}語',
    jlptBackToHub: 'JLPT級一覧',
    jlptPrevDay: '前のDay',
    jlptNextDay: '次のDay',
    contributeTitle: 'LangStartを一緒に作りませんか',
    contributeLead:
      'オープンソースです。読み・訳・表の修正や、新しい言語の追加を歓迎します。',
    contributeCta: 'GitHubで見る',
  },
  zh: {
    appName: 'LangStart',
    tagline: '入门必背，少走弯路。',
    chooseTarget: '选择你想学习的语言',
    comingSoon: '即将推出',
    back: '返回',
    asLearner: '你的语言',
    hearPronunciation: '发音',
    correct: '正确！',
    wrong: '不对',
    next: '下一题',
    score: '得分',
    restart: '重新开始',
    noMoreQuestions: '本组已完成！',
    categories: '类别',
    startCategory: '开始测验',
    emptyCategory: '该类别还没有卡片。',
    languageHubLead: '从基础开始——初学者必背的入门内容。',
    languageHubMenuHint: '手机上请点左上角三条线打开分类菜单。',
    overview: '概览',
    roundResult: '第 {n} 轮结果',
    perfectRound: '完美！全部正确',
    retryMissed: '重做 {n} 道错题',
    missedSummary: '正确 {correct} · 错误 {missed}。只重做错题。',
    yourAnswer: '你的答案',
    correctAnswer: '正确答案',
    tapToContinue: '点击继续',
    enterToContinue: '按 Enter 或点击继续',
    typeCharacter: '输入读音',
    checkAnswer: '检查',
    openTable: '对照表',
    close: '关闭',
    vocabGrade: '学年',
    vocabMode: '测验模式',
    vocabModeReading: '读音',
    vocabModeMeaning: '意思',
    vocabCount: '题数',
    jlptHubLead: '与短小必背基础包分开的大型词汇练习。先选级别，再选 Day（约20词）。',
    jlptHubMeta: '{days}天 · {words}词',
    jlptBackToHub: 'JLPT 级别列表',
    jlptPrevDay: '上一 Day',
    jlptNextDay: '下一 Day',
    contributeTitle: '一起完善 LangStart',
    contributeLead: '开源项目。欢迎修正读音、译文、对照表，或帮助添加新语言。',
    contributeCta: '在 GitHub 查看',
  },
  fr: {
    appName: 'LangStart',
    tagline: 'Ce qu’il faut retenir pour bien commencer.',
    chooseTarget: 'Choisissez une langue à apprendre',
    comingSoon: 'Bientôt',
    back: 'Retour',
    asLearner: 'Votre langue',
    hearPronunciation: 'Prononciation',
    correct: 'Correct !',
    wrong: 'Pas tout à fait',
    next: 'Suivant',
    score: 'Score',
    restart: 'Recommencer',
    noMoreQuestions: 'Vous avez terminé ce set !',
    categories: 'Catégories',
    startCategory: 'Commencer le quiz',
    emptyCategory: 'Pas encore de cartes dans cette catégorie.',
    languageHubLead: 'Commencez par les bases — l’essentiel à mémoriser.',
    languageHubMenuHint:
      'Sur mobile, appuyez sur les trois traits en haut à gauche pour ouvrir le menu.',
    overview: 'Aperçu',
    roundResult: 'Résultat du tour {n}',
    perfectRound: 'Parfait — tout est correct !',
    retryMissed: 'Réessayer {n} erreurs',
    missedSummary: '{correct} correct(s) · {missed} erreur(s). Reprenez les ratés.',
    yourAnswer: 'Vous',
    correctAnswer: 'Réponse',
    tapToContinue: 'Touchez pour continuer',
    enterToContinue: 'Entrée ou touchez pour continuer',
    typeCharacter: 'Saisissez le son',
    checkAnswer: 'Vérifier',
    openTable: 'Tableau',
    close: 'Fermer',
    vocabGrade: 'Niveau scolaire',
    vocabMode: 'Mode de quiz',
    vocabModeReading: 'Lecture',
    vocabModeMeaning: 'Sens',
    vocabCount: 'Questions',
    jlptHubLead:
      'Un grand parcours de vocabulaire — à part des bases courtes à mémoriser. Choisissez un niveau, puis un jour (~20 mots).',
    jlptHubMeta: '{days} jours · {words} mots',
    jlptBackToHub: 'Tous les niveaux JLPT',
    jlptPrevDay: 'Jour précédent',
    jlptNextDay: 'Jour suivant',
    contributeTitle: 'Aidez à construire LangStart',
    contributeLead:
      'Projet open source — corrigez sons, traductions ou tableaux, ou aidez à ajouter une langue.',
    contributeCta: 'Voir sur GitHub',
  },
  es: {
    appName: 'LangStart',
    tagline: 'Lo esencial para arrancar bien.',
    chooseTarget: 'Elige un idioma para aprender',
    comingSoon: 'Próximamente',
    back: 'Atrás',
    asLearner: 'Tu idioma',
    hearPronunciation: 'Pronunciación',
    correct: '¡Correcto!',
    wrong: 'Casi',
    next: 'Siguiente',
    score: 'Puntos',
    restart: 'Reiniciar',
    noMoreQuestions: '¡Terminaste este set!',
    categories: 'Categorías',
    startCategory: 'Empezar quiz',
    emptyCategory: 'Aún no hay tarjetas en esta categoría.',
    languageHubLead: 'Empieza por lo básico — lo esencial que hay que memorizar.',
    languageHubMenuHint:
      'En el móvil, toca las tres rayas arriba a la izquierda para abrir el menú.',
    overview: 'Resumen',
    roundResult: 'Resultados de la ronda {n}',
    perfectRound: '¡Perfecto — todo correcto!',
    retryMissed: 'Repetir {n} fallos',
    missedSummary: '{correct} correctas · {missed} fallos. Solo los fallos otra vez.',
    yourAnswer: 'Tú',
    correctAnswer: 'Respuesta',
    tapToContinue: 'Toca para continuar',
    enterToContinue: 'Enter o toca para continuar',
    typeCharacter: 'Escribe el sonido',
    checkAnswer: 'Comprobar',
    openTable: 'Tabla',
    close: 'Cerrar',
    vocabGrade: 'Grado escolar',
    vocabMode: 'Modo de quiz',
    vocabModeReading: 'Lectura',
    vocabModeMeaning: 'Significado',
    vocabCount: 'Preguntas',
    jlptHubLead:
      'Una pista de vocabulario más grande — aparte de lo básico corto. Elige un nivel y luego un día (~20 palabras).',
    jlptHubMeta: '{days} días · {words} palabras',
    jlptBackToHub: 'Todos los niveles JLPT',
    jlptPrevDay: 'Día anterior',
    jlptNextDay: 'Día siguiente',
    contributeTitle: 'Ayuda a construir LangStart',
    contributeLead:
      'Código abierto: corrige sonidos, traducciones o tablas, o ayuda a añadir un idioma.',
    contributeCta: 'Ver en GitHub',
  },
  de: {
    appName: 'LangStart',
    tagline: 'Was man zum Start einfach können muss.',
    chooseTarget: 'Wähle eine Sprache zum Lernen',
    comingSoon: 'Demnächst',
    back: 'Zurück',
    asLearner: 'Deine Sprache',
    hearPronunciation: 'Aussprache',
    correct: 'Richtig!',
    wrong: 'Leider falsch',
    next: 'Weiter',
    score: 'Punkte',
    restart: 'Neu starten',
    noMoreQuestions: 'Dieses Set ist fertig!',
    categories: 'Kategorien',
    startCategory: 'Quiz starten',
    emptyCategory: 'In dieser Kategorie gibt es noch keine Karten.',
    languageHubLead: 'Fang mit den Grundlagen an — das, was man auswendig brauchen wird.',
    languageHubMenuHint:
      'Auf dem Handy: oben links die drei Striche tippen, um das Menü zu öffnen.',
    overview: 'Übersicht',
    roundResult: 'Runde-{n}-Ergebnis',
    perfectRound: 'Perfekt — alles richtig!',
    retryMissed: '{n} Fehler wiederholen',
    missedSummary: '{correct} richtig · {missed} falsch. Nur die Fehler noch einmal.',
    yourAnswer: 'Du',
    correctAnswer: 'Antwort',
    tapToContinue: 'Tippen zum Weiter',
    enterToContinue: 'Enter oder tippen zum Weiter',
    typeCharacter: 'Laut eingeben',
    checkAnswer: 'Prüfen',
    openTable: 'Tabelle',
    close: 'Schließen',
    vocabGrade: 'Schuljahr',
    vocabMode: 'Quizmodus',
    vocabModeReading: 'Lesung',
    vocabModeMeaning: 'Bedeutung',
    vocabCount: 'Fragen',
    jlptHubLead:
      'Ein größerer Vokabel-Track — getrennt von den kurzen Basics. Level wählen, dann einen Tag (~20 Wörter).',
    jlptHubMeta: '{days} Tage · {words} Wörter',
    jlptBackToHub: 'Alle JLPT-Stufen',
    jlptPrevDay: 'Vorheriger Tag',
    jlptNextDay: 'Nächster Tag',
    contributeTitle: 'Hilf mit an LangStart',
    contributeLead:
      'Open Source — korrigiere Laute, Übersetzungen oder Tabellen, oder hilf eine Sprache hinzuzufügen.',
    contributeCta: 'Auf GitHub ansehen',
  },
  ru: {
    appName: 'LangStart',
    tagline: 'То, что нужно выучить в самом начале.',
    chooseTarget: 'Выберите язык для изучения',
    comingSoon: 'Скоро',
    back: 'Назад',
    asLearner: 'Ваш язык',
    hearPronunciation: 'Произношение',
    correct: 'Верно!',
    wrong: 'Не совсем',
    next: 'Дальше',
    score: 'Счёт',
    restart: 'Заново',
    noMoreQuestions: 'Этот набор пройден!',
    categories: 'Категории',
    startCategory: 'Начать тест',
    emptyCategory: 'В этой категории пока нет карточек.',
    languageHubLead: 'Начните с основ — то, что скучно, но нужно запомнить.',
    languageHubMenuHint:
      'На телефоне нажмите три полоски слева сверху, чтобы открыть меню.',
    overview: 'Обзор',
    roundResult: 'Итог раунда {n}',
    perfectRound: 'Идеально — всё верно!',
    retryMissed: 'Повторить {n} ошибок',
    missedSummary: '{correct} верно · {missed} ошибок. Только ошибки ещё раз.',
    yourAnswer: 'Вы',
    correctAnswer: 'Ответ',
    tapToContinue: 'Нажмите, чтобы продолжить',
    enterToContinue: 'Enter или нажмите, чтобы продолжить',
    typeCharacter: 'Введите звучание',
    checkAnswer: 'Проверить',
    openTable: 'Таблица',
    close: 'Закрыть',
    vocabGrade: 'Класс',
    vocabMode: 'Режим квиза',
    vocabModeReading: 'Чтение',
    vocabModeMeaning: 'Значение',
    vocabCount: 'Вопросы',
    jlptHubLead:
      'Большой словарный трек — отдельно от короткого базового набора. Выберите уровень, затем день (~20 слов).',
    jlptHubMeta: '{days} дн. · {words} слов',
    jlptBackToHub: 'Все уровни JLPT',
    jlptPrevDay: 'Предыдущий день',
    jlptNextDay: 'Следующий день',
    contributeTitle: 'Помогите развивать LangStart',
    contributeLead:
      'Открытый проект — правьте звучание, переводы и таблицы или помогите добавить язык.',
    contributeCta: 'Открыть на GitHub',
  },
}

export function t(learnerLang: LangCode, key: UiKey): string {
  return UI_STRINGS[learnerLang]?.[key] ?? UI_STRINGS.en[key] ?? key
}

/** Replace `{name}` placeholders in a UI string. */
export function tf(
  learnerLang: LangCode,
  key: UiKey,
  vars: Record<string, string | number>,
): string {
  return Object.entries(vars).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    t(learnerLang, key),
  )
}

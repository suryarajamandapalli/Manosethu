export type SupportedLanguage = "en" | "te" | "hi";

export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  demoEnvironment: string;
  demoData: string;
  sampleCase: string;
  nationalHelpline: string;
  emergencySupport: string;
  privacy: string;
  anonymousId: string;
  victimView: string;
  counsellorConsole: string;
  howAreYouFeelingToday: string;
  checkInSupportingText: string;
  startCheckIn: string;
  comeBackLater: string;
  lastCheckIn: string;
  currentTrend: string;
  nextCheckIn: string;
  step: string;
  of: string;
  cancel: string;
  back: string;
  continue: string;
  submitCheckIn: string;
  reviewingCheckIn: string;
  feelingQuestion: string;
  feelingSubtitle: string;
  tellUsMore: string;
  tellUsMorePlaceholder: string;
  calm: string;
  okay: string;
  worried: string;
  distressed: string;
  veryDistressed: string;
  safetyQuestion: string;
  safetySubtitle: string;
  yes: string;
  notSure: string;
  no: string;
  dontHandleAlone: string;
  dontHandleAloneDesc: string;
  requestImmediateSupport: string;
  contactSupport: string;
  experiencesQuestion: string;
  experiencesSubtitle: string;
  expSleep: string;
  expWorry: string;
  expSafety: string;
  expConcentration: string;
  expIsolation: string;
  expInterest: string;
  never: string;
  sometimes: string;
  often: string;
  nearlyEveryDay: string;
  voiceCheckInTitle: string;
  voiceCheckInSubtitle: string;
  recordVoiceCheckIn: string;
  recording: string;
  voiceAnalysisLabel: string;
  voiceDisclaimer: string;
  dynamicDistressScore: string;
  scoreExplanation: string;
  trendImproving: string;
  trendStable: string;
  trendIncreasing: string;
  riskLow: string;
  riskModerate: string;
  riskHigh: string;
  riskVeryHigh: string;
  escalationRisk: string;
  escalationLow: string;
  escalationModerate: string;
  escalationElevated: string;
  whyThisChanged: string;
  signalsDetected: string;
  humanReviewRecommended: string;
  recommendedNextStep: string;
  speakWithProfessional: string;
  requestACall: string;
  availableSupportPathways: string;
  supportVoluntaryNote: string;
  counsellingSupport: string;
  legalSupport: string;
  protectionSupport: string;
  rehabilitationSupport: string;
  longitudinalTrackingTitle: string;
  longitudinalChartDisclaimer: string;
  supportConsoleTitle: string;
  casesRequiringReview: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: "MANOSETHU",
    appTagline: "AI assists. Humans decide. People receive support.",
    demoEnvironment: "DEMO ENVIRONMENT",
    demoData: "DEMO DATA",
    sampleCase: "SAMPLE CASE",
    nationalHelpline: "National Helpline: 14566",
    emergencySupport: "Emergency Support",
    privacy: "Privacy & Data Protection",
    anonymousId: "Anonymous Case ID",
    victimView: "Victim / Complainant",
    counsellorConsole: "Support Officer Console",
    howAreYouFeelingToday: "How are you feeling today?",
    checkInSupportingText: "Your check-in helps us understand how things are changing over time.",
    startCheckIn: "START CHECK-IN",
    comeBackLater: "Not ready? Come back later.",
    lastCheckIn: "Last Check-in",
    currentTrend: "Current Trend",
    nextCheckIn: "Next Check-in in 3 days",
    step: "Step",
    of: "of",
    cancel: "Cancel",
    back: "Back",
    continue: "Continue",
    submitCheckIn: "Submit Check-in",
    reviewingCheckIn: "Reviewing your check-in...",
    feelingQuestion: "How are you feeling right now?",
    feelingSubtitle: "Select the option that best reflects your current state.",
    tellUsMore: "Would you like to tell us more?",
    tellUsMorePlaceholder: "Share anything on your mind. Read only during authorized human review...",
    calm: "Calm",
    okay: "Okay",
    worried: "Worried",
    distressed: "Distressed",
    veryDistressed: "Very distressed",
    safetyQuestion: "Do you feel safe right now?",
    safetySubtitle: "Your physical safety and peace of mind are the top priority.",
    yes: "Yes",
    notSure: "Not sure",
    no: "No",
    dontHandleAlone: "You don't have to handle this alone.",
    dontHandleAloneDesc: "Because you indicated you do not feel safe right now, you can connect directly with emergency human protection or request an immediate officer call.",
    requestImmediateSupport: "REQUEST IMMEDIATE SUPPORT",
    contactSupport: "CONTACT SUPPORT",
    experiencesQuestion: "Recent Experiences",
    experiencesSubtitle: "Over the past few days, how often have you experienced the following?",
    expSleep: "Difficulty sleeping or staying asleep",
    expWorry: "Feeling worried or fearful",
    expSafety: "Feeling unsafe or on high alert",
    expConcentration: "Difficulty concentrating on daily tasks",
    expIsolation: "Feeling isolated from others",
    expInterest: "Loss of interest in normal activities",
    never: "Never",
    sometimes: "Sometimes",
    often: "Often",
    nearlyEveryDay: "Nearly every day",
    voiceCheckInTitle: "Prefer speaking instead?",
    voiceCheckInSubtitle: "You can record a short voice check-in if speaking is easier than typing.",
    recordVoiceCheckIn: "RECORD VOICE CHECK-IN",
    recording: "Recording voice check-in...",
    voiceAnalysisLabel: "VOICE ANALYSIS",
    voiceDisclaimer: "Note: Voice analysis evaluates acoustic pacing and linguistic markers. It does not perform clinical diagnosis.",
    dynamicDistressScore: "Dynamic Distress Score",
    scoreExplanation: "An indicator used to support monitoring and human review. It is not a clinical diagnosis.",
    trendImproving: "Improving",
    trendStable: "Stable",
    trendIncreasing: "Increasing",
    riskLow: "LOW",
    riskModerate: "MODERATE",
    riskHigh: "HIGH",
    riskVeryHigh: "VERY HIGH",
    escalationRisk: "Escalation Risk",
    escalationLow: "Low",
    escalationModerate: "Moderate",
    escalationElevated: "Elevated",
    whyThisChanged: "WHY THIS CHANGED",
    signalsDetected: "SIGNALS DETECTED",
    humanReviewRecommended: "HUMAN REVIEW RECOMMENDED",
    recommendedNextStep: "RECOMMENDED NEXT STEP",
    speakWithProfessional: "Would you like to speak with a support professional?",
    requestACall: "REQUEST A CALL",
    availableSupportPathways: "Available Support Pathways",
    supportVoluntaryNote: "These are recommendations for human review. They are voluntary pathways and not automated interventions.",
    counsellingSupport: "Counselling Support",
    legalSupport: "Legal Aid",
    protectionSupport: "Witness Protection & Safety",
    rehabilitationSupport: "Rehabilitation & Relief",
    longitudinalTrackingTitle: "Your Well-being Over Time",
    longitudinalChartDisclaimer: "Longitudinal trends are based on stored check-in responses to assist authorized human review.",
    supportConsoleTitle: "MANOSETHU Support Console",
    casesRequiringReview: "Cases Requiring Review",
  },
  te: {
    appName: "మనోసేతు",
    appTagline: "AI సహాయపడుతుంది. మానవులు నిర్ణయిస్తారు. ప్రజలు మద్దతు పొందుతారు.",
    demoEnvironment: "డెమో ఎన్విరాన్‌మెంట్",
    demoData: "డెమో డేటా",
    sampleCase: "నమూనా కేసు",
    nationalHelpline: "జాతీయ హెల్ప్‌లైన్: 14566",
    emergencySupport: "అత్యవసర సహాయం",
    privacy: "గోప్యత మరియు డేటా రక్షణ",
    anonymousId: "అనామక కేస్ ID",
    victimView: "బాధిత వ్యక్తి / ఫిర్యాదుదారుడు",
    counsellorConsole: "కౌన్సిలర్ కన్సోల్",
    howAreYouFeelingToday: "ఈరోజు మీరు ఎలా ఉన్నారు?",
    checkInSupportingText: "మీ చెక్-ఇన్ కాలక్రమేణా మార్పులను అర్థం చేసుకోవడానికి మాకు సహాయపడుతుంది.",
    startCheckIn: "చెక్-ఇన్ ప్రారంభించండి",
    comeBackLater: "సిద్ధంగా లేరా? తరువాత రండి.",
    lastCheckIn: "చివరి చెక్-ఇన్",
    currentTrend: "ప్రస్తుత ట్రెండ్",
    nextCheckIn: "తదుపరి చెక్-ఇన్ 3 రోజుల్లో",
    step: "దశ",
    of: "/",
    cancel: "రద్దు చేయండి",
    back: "వెనుకకు",
    continue: "కొనసాగించండి",
    submitCheckIn: "చెక్-ఇన్ సమర్పించండి",
    reviewingCheckIn: "మీ చెక్-ఇన్ సమీక్షిస్తోంది...",
    feelingQuestion: "ప్రస్తుతం మీకు ఎలా అనిపిస్తుంది?",
    feelingSubtitle: "మీ ప్రస్తుత స్థితిని సూచించే ఎంపికను ఎంచుకోండి.",
    tellUsMore: "మరింత చెప్పాలనుకుంటున్నారా?",
    tellUsMorePlaceholder: "మీ మనస్సులో ఉన్న భావాలను పంచుకోండి. అధికారిక సమీక్షలో మాత్రమే చదవబడుతుంది...",
    calm: "ప్రశాంతంగా",
    okay: "బాగానే ఉంది",
    worried: "ఆందోళనగా",
    distressed: "బాధగా",
    veryDistressed: "చాలా బాధగా",
    safetyQuestion: "మీరు ఇప్పుడు సురక్షితంగా ఉన్నారని భావిస్తున్నారా?",
    safetySubtitle: "మీ భద్రత మరియు మనశ్శాంతి మా మొదటి ప్రాధాన్యత.",
    yes: "అవును",
    notSure: "ఖచ్చితంగా తెలియదు",
    no: "కాదు",
    dontHandleAlone: "మీరు దీన్ని ఒంటరిగా ఎదుర్కోవాల్సిన అవసరం లేదు.",
    dontHandleAloneDesc: "మీరు సురక్షితంగా లేరని తెలిపినందున, తక్షణ మానవ రక్షణ లేదా అధికారి కాల్‌ను అభ్యర్థించవచ్చు.",
    requestImmediateSupport: "తక్షణ మద్దతును అభ్యర్థించండి",
    contactSupport: "మద్దతును సంప్రదించండి",
    experiencesQuestion: "ఇటీవలి అనుభవాలు",
    experiencesSubtitle: "గత కొద్ది రోజులుగా, మీరు ఈ క్రింది వాటిని ఎంత తరచుగా ఎదుర్కొన్నారు?",
    expSleep: "నిద్ర పట్టడంలో ఇబ్బంది",
    expWorry: "ఆందోళన లేదా భయం కలగడం",
    expSafety: "అభద్రతా భావం కలగడం",
    expConcentration: "పనులపై దృష్టి కేంద్రీకరించడం కష్టం కావడం",
    expIsolation: "ఒంటరిగా అనిపించడం",
    expInterest: "సాధారణ కార్యకలాపాలపై ఆసక్తి కోల్పోవడం",
    never: "ఎప్పుడూ లేదు",
    sometimes: "కొన్నిసార్లు",
    often: "తరచుగా",
    nearlyEveryDay: "దాదాపు ప్రతిరోజూ",
    voiceCheckInTitle: "మాట్లాడటానికి ఇష్టపడుతున్నారా?",
    voiceCheckInSubtitle: "టైప్ చేయడం కంటే మాట్లాడటం సులభమైతే మీరు వాయిస్ చెక్-ఇన్ రికార్డ్ చేయవచ్చు.",
    recordVoiceCheckIn: "వాయిస్ చెక్-ఇన్ రికార్డ్ చేయండి",
    recording: "వాయిస్ రికార్డ్ అవుతోంది...",
    voiceAnalysisLabel: "వాయిస్ విశ్లేషణ",
    voiceDisclaimer: "గమనిక: వాయిస్ విశ్లేషణ వేగం మరియు భాషా సంకేతాలను మాత్రమే అంచనా వేస్తుంది. ఇది వైద్య నిర్ధారణ కాదు.",
    dynamicDistressScore: "డైనమిక్ డిస్ట్రెస్ స్కోరు",
    scoreExplanation: "మానిటరింగ్ మరియు మానవ సమీక్షకు మద్దతు ఇవ్వడానికి ఉపయోగించే సూచిక. ఇది క్లినికల్ రోగ నిర్ధారణ కాదు.",
    trendImproving: "మెరుగుపడుతోంది",
    trendStable: "స్థిరంగా ఉంది",
    trendIncreasing: "పెరుగుతోంది",
    riskLow: "తక్కువ",
    riskModerate: "మితమైన",
    riskHigh: "ఎక్కువ",
    riskVeryHigh: "చాలా ఎక్కువ",
    escalationRisk: "ఎస్కలేషన్ రిస్క్",
    escalationLow: "తక్కువ",
    escalationModerate: "మితమైన",
    escalationElevated: "ఎక్కువ",
    whyThisChanged: "ఇది ఎందుకు మారింది",
    signalsDetected: "గుర్తించిన సంకేతాలు",
    humanReviewRecommended: "మానవ సమీక్ష సిఫార్సు చేయబడింది",
    recommendedNextStep: "సిఫార్సు చేయబడిన తదుపరి చర్య",
    speakWithProfessional: "మద్దతు నిపుణుడితో మాట్లాడాలనుకుంటున్నారా?",
    requestACall: "కాల్ అభ్యర్థించండి",
    availableSupportPathways: "అందుబాటులో ఉన్న మద్దతు మార్గాలు",
    supportVoluntaryNote: "ఇవి మానవ సమీక్ష కోసం సిఫార్సులు. ఇవి స్వచ్ఛంద మార్గాలు, స్వయంచాలక జోక్యాలు కావు.",
    counsellingSupport: "కౌన్సిలింగ్ మద్దతు",
    legalSupport: "న్యాయ సహాయం",
    protectionSupport: "రక్షణ & భద్రత",
    rehabilitationSupport: "పునరావాస సహాయం",
    longitudinalTrackingTitle: "కాలక్రమేణా మీ శ్రేయస్సు",
    longitudinalChartDisclaimer: "ట్రెండ్‌లు చెక్-ఇన్ ప్రతిస్పందనలపై ఆధారపడి ఉంటాయి మరియు మానవ సమీక్షకు మద్దతు ఇవ్వడానికి మాత్రమే ఉద్దేశించబడ్డాయి.",
    supportConsoleTitle: "మనోసేతు సపోర్ట్ కన్సోల్",
    casesRequiringReview: "సమీక్ష అవసరమైన కేసులు",
  },
  hi: {
    appName: "मनोसेतु",
    appTagline: "एआई सहायता करता है। मानव निर्णय लेते हैं। लोगों को सहायता मिलती है।",
    demoEnvironment: "डेमो वातावरण",
    demoData: "डेमो डेटा",
    sampleCase: "सैंपल केस",
    nationalHelpline: "राष्ट्रीय हेल्पलाइन: 14566",
    emergencySupport: "आपातकालीन सहायता",
    privacy: "गोपनीयता और डेटा सुरक्षा",
    anonymousId: "अनाम केस आईडी",
    victimView: "पीड़ित / शिकायतकर्ता",
    counsellorConsole: "सपोर्ट ऑफिसर कंसोल",
    howAreYouFeelingToday: "आज आप कैसा महसूस कर रहे हैं?",
    checkInSupportingText: "आपका चेक-इन हमें समय के साथ आ रहे बदलावों को समझने में मदद करता है।",
    startCheckIn: "चेक-इन शुरू करें",
    comeBackLater: "तैयार नहीं हैं? बाद में आएं।",
    lastCheckIn: "पिछला चेक-इन",
    currentTrend: "वर्तमान रुझान",
    nextCheckIn: "अगला चेक-इन 3 दिनों में",
    step: "चरण",
    of: "/",
    cancel: "रद्द करें",
    back: "वापस",
    continue: "आगे बढ़ें",
    submitCheckIn: "चेक-इन सबमिट करें",
    reviewingCheckIn: "आपके चेक-इन की समीक्षा की जा रही है...",
    feelingQuestion: "इस समय आप कैसा महसूस कर रहे हैं?",
    feelingSubtitle: "वह विकल्प चुनें जो आपकी वर्तमान स्थिति को सबसे अच्छी तरह दर्शाता है।",
    tellUsMore: "क्या आप कुछ और साझा करना चाहेंगे?",
    tellUsMorePlaceholder: "अपने विचार साझा करें। यह केवल अधिकृत मानव समीक्षा के दौरान पढ़ा जाएगा...",
    calm: "शांत",
    okay: "ठीक है",
    worried: "चिंतित",
    distressed: "परेशान",
    veryDistressed: "अत्यधिक परेशान",
    safetyQuestion: "क्या आप अभी सुरक्षित महसूस कर रहे हैं?",
    safetySubtitle: "आपकी शारीरिक सुरक्षा और मानसिक शांति सर्वोच्च प्राथमिकता है।",
    yes: "हाँ",
    notSure: "सुनिश्चित नहीं",
    no: "नहीं",
    dontHandleAlone: "आपको इसे अकेले संभालने की ज़रूरत नहीं है।",
    dontHandleAloneDesc: "क्योंकि आपने असुरक्षित महसूस करने का संकेत दिया है, आप आपातकालीन मानव सुरक्षा या अधिकारी कॉल का अनुरोध कर सकते हैं।",
    requestImmediateSupport: "तत्काल सहायता का अनुरोध करें",
    contactSupport: "सहायता से संपर्क करें",
    experiencesQuestion: "हाल के अनुभव",
    experiencesSubtitle: "पिछले कुछ दिनों में, आपने निम्नलिखित का कितनी बार अनुभव किया है?",
    expSleep: "सोने या नींद में रहने में कठिनाई",
    expWorry: "असामान्य रूप से चिंतित या भयभीत महसूस करना",
    expSafety: "असुरक्षित महसूस करना",
    expConcentration: "दैनिक कार्यों पर ध्यान केंद्रित करने में कठिनाई",
    expIsolation: "दूसरों से अलग-थलग महसूस करना",
    expInterest: "सामान्य गतिविधियों में रुचि कम होना",
    never: "कभी नहीं",
    sometimes: "कभी-कभी",
    often: "अक्सर",
    nearlyEveryDay: "लगभग हर दिन",
    voiceCheckInTitle: "बोलकर बताना पसंद करेंगे?",
    voiceCheckInSubtitle: "यदि टाइप करने से बोलना आसान लगता है, तो आप एक संक्षिप्त वॉइस चेक-इन रिकॉर्ड कर सकते हैं।",
    recordVoiceCheckIn: "वॉइस चेक-इन रिकॉर्ड करें",
    recording: "वॉइस चेक-इन रिकॉर्ड हो रहा है...",
    voiceAnalysisLabel: "वॉइस विश्लेषण",
    voiceDisclaimer: "नोट: वॉइस विश्लेषण केवल गति और भाषाई संकेतों का मूल्यांकन करता है। यह कोई नैदानिक निदान नहीं है।",
    dynamicDistressScore: "डायनेमिक डिस्ट्रेस स्कोर",
    scoreExplanation: "निगरानी और मानव समीक्षा का समर्थन करने वाला संकेतक। यह कोई नैदानिक ​​निदान नहीं है।",
    trendImproving: "सुधार हो रहा है",
    trendStable: "स्थिर",
    trendIncreasing: "बढ़ रहा है",
    riskLow: "कम",
    riskModerate: "मध्यम",
    riskHigh: "उच्च",
    riskVeryHigh: "अत्यधिक उच्च",
    escalationRisk: "एस्केलेशन रिस्क",
    escalationLow: "कम",
    escalationModerate: "मध्यम",
    escalationElevated: "बढ़ा हुआ",
    whyThisChanged: "यह क्यों बदला",
    signalsDetected: "पहचाने गए संकेत",
    humanReviewRecommended: "मानव समीक्षा की सिफारिश",
    recommendedNextStep: "अनुशंसित अगला कदम",
    speakWithProfessional: "क्या आप किसी सहायता विशेषज्ञ से बात करना चाहेंगे?",
    requestACall: "कॉल का अनुरोध करें",
    availableSupportPathways: "उपलब्ध सहायता मार्ग",
    supportVoluntaryNote: "ये मानव समीक्षा के लिए सिफारिशें हैं। ये स्वैच्छिक रास्ते हैं, स्वचालित हस्तक्षेप नहीं।",
    counsellingSupport: "परामर्श सहायता",
    legalSupport: "कानूनी सहायता",
    protectionSupport: "गवाह सुरक्षा और सुरक्षा",
    rehabilitationSupport: "पुनर्वास सहायता",
    longitudinalTrackingTitle: "समय के साथ आपका स्वास्थ्य",
    longitudinalChartDisclaimer: "रुझान चेक-इन प्रतिक्रियाओं पर आधारित हैं और केवल मानव समीक्षा का समर्थन करने के लिए हैं।",
    supportConsoleTitle: "मनोसेतु सपोर्ट कंसोल",
    casesRequiringReview: "समीक्षा के लिए आवश्यक मामले",
  },
};

export function getTranslation(lang: SupportedLanguage = "en"): TranslationDictionary {
  return translations[lang] || translations.en;
}

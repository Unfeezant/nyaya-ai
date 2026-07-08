export const SUGGESTED_PROMPTS = [
  "My employer has not paid my salary.",
  "My landlord refuses to return my deposit.",
  "I received an online scam.",
  "My husband is abusive.",
  "I want to register a trademark."
];

export const MOCK_CHAT_RESPONSES = {
  "My employer has not paid my salary.": {
    content: "Under Section 3 of the Payment of Wages Act, every employer is responsible for the payment of all wages required to be paid under the Act. Non-payment of salary is a serious legal violation. Here are your details:",
    sections: {
      situationSummary: "Non-payment of salary/wages by your employer, constituting a breach of the employment agreement and a violation of labor regulations.",
      relevantLaws: [
        "**Payment of Wages Act, 1936**: Mandates timely payment of wages without unauthorized deductions.",
        "**Industrial Disputes Act, 1947 (Section 33C)**: Recovery of money due from an employer.",
        "**Indian Contract Act, 1872 (Section 73)**: Compensation for breach of contract."
      ],
      yourRights: [
        "Right to receive salary within 7 days of the end of the wage period (10 days if company has >1000 employees).",
        "Right to claim interest on delayed salary payments.",
        "Right to legal recourse and filing a dispute with the Labor Commissioner."
      ],
      evidenceNeeded: [
        "Employment Letter / Contract specifying salary terms.",
        "Bank statements showing past credit history and non-credit of the disputed months.",
        "Monthly payslips.",
        "Communication history (Emails, Slack, WhatsApp chats demanding salary)."
      ],
      nextSteps: [
        "Send a formal Legal Notice to the employer via registered post, giving a 15-day ultimatum.",
        "If unresolved, file a complaint with the local Labor Commissioner office.",
        "File a suit under Section 33C of the Industrial Disputes Act in the Labor Court."
      ],
      govResources: [
        { name: "Ministry of Labour & Employment", description: "Official website for labor disputes registration.", url: "https://labour.gov.in" },
        { name: "SAMADHAN Portal", description: "Online portal for Industrial Disputes filing.", url: "https://samadhan.labour.gov.in" }
      ],
      notes: "Ensure all communications requesting salary are in writing. Do not resign under duress without documenting the non-payment of salary first.",
      disclaimer: "NyayaAI is an AI-powered assistant. This advice is for information purposes and does not constitute formal legal advice. Please consult a qualified labor lawyer before proceeding."
    }
  },
  "My landlord refuses to return my deposit.": {
    content: "Tenant rights regarding security deposits are protected under state Rent Control Acts and model tenancy frameworks. Refusal to refund deposit without damage proofs is unlawful.",
    sections: {
      situationSummary: "Withholding of security deposit by the landlord post-tenancy termination without valid justification or documented property damage.",
      relevantLaws: [
        "**Model Tenancy Act, 2021 (Section 11)**: Mandates refund of security deposit within one month of vacating.",
        "**Transfer of Property Act, 1882 (Section 108)**: Duties and liabilities of landlord and tenant.",
        "**State Rent Control Act**: Specific provisions regarding security deposit limits (typically capped at 2 months rent)."
      ],
      yourRights: [
        "Right to get full refund of deposit, minus legitimate dues (like unpaid utility bills).",
        "Right to see invoice receipts of any repairs claimed by the landlord.",
        "Right to legal occupancy until deposit is refunded in certain jurisdictions."
      ],
      evidenceNeeded: [
        "Signed Rent / Lease Agreement.",
        "Rent receipts and deposit payment transaction receipts.",
        "Notice to vacate sent to the landlord.",
        "Photos / Videos of the property condition when vacating.",
        "Written requests for the refund."
      ],
      nextSteps: [
        "Send a formal demand notice to the landlord citing the Model Tenancy Act.",
        "File a petition before the Rent Authority / Rent Tribunal of your district.",
        "File a civil case for recovery of money in the local Small Causes Court."
      ],
      govResources: [
        { name: "Model Tenancy Online Guide", description: "Official rent authority guidelines.", url: "https://mohua.gov.in" }
      ],
      notes: "Always carry out a joint inspection when vacating and take photos to prevent false claims of damage by the landlord.",
      disclaimer: "NyayaAI is an AI-powered assistant. This advice is for information purposes and does not constitute formal legal advice."
    }
  },
  "I received an online scam.": {
    content: "Cyber financial scams are covered under the Information Technology (IT) Act and the Indian Penal Code (IPC). Immediate actions within the first 24 hours are critical to freeze accounts.",
    sections: {
      situationSummary: "Cyber fraud or online financial scam resulting in unauthorized monetary loss or identity theft.",
      relevantLaws: [
        "**Information Technology Act, 2000 (Section 66D)**: Punishment for cheating by personation using computer resource.",
        "**Bharatiya Nyaya Sanhita, 2023 (Section 319 / IPC 420)**: Cheating and dishonestly inducing delivery of property."
      ],
      yourRights: [
        "Right to report cyber crimes online anonymously.",
        "Right to zero-liability under RBI guidelines if cyber fraud is reported to the bank within 3 working days.",
        "Right to file a complaint at any cyber cell regardless of the crime location (Zero FIR)."
      ],
      evidenceNeeded: [
        "Bank transaction statement or SMS screenshot showing debit details.",
        "Screenshots of chats, emails, or websites associated with the scammer.",
        "Phone number or UPI ID used by the scammer.",
        "Scammer's profile links or social media account screenshots."
      ],
      nextSteps: [
        "Call the National Cyber Crime Helpline number **1930** immediately to freeze funds.",
        "Register a complaint online at the National Cyber Crime Reporting Portal.",
        "Inform your bank immediately to block cards/accounts and request a Chargeback."
      ],
      govResources: [
        { name: "National Cyber Crime Portal", description: "Official portal to report online scams.", url: "https://cybercrime.gov.in" },
        { name: "RBI Safety Circulars", description: "Rules regarding limited liability of bank customers.", url: "https://rbi.org.in" }
      ],
      notes: "The 'Golden Hour' is the first 2 hours of the fraud. Speed is crucial for the bank to intercept and hold the transferred amount.",
      disclaimer: "NyayaAI is an AI-powered assistant. This advice is for information purposes and does not constitute formal legal advice."
    }
  },
  "My husband is abusive.": {
    content: "Protection for women facing domestic violence is strongly enforced under Indian law. You have access to immediate shelter, protection orders, and legal aid.",
    sections: {
      situationSummary: "Domestic violence and abusive behavior by spouse, invoking protection rights for marital abuse.",
      relevantLaws: [
        "**Protection of Women from Domestic Violence Act, 2005 (PWDVA)**: Provides civil remedies like protection orders, residence orders.",
        "**Bharatiya Nyaya Sanhita, 2023 (Section 85 / IPC 498A)**: Criminal offense of cruelty by husband or relatives."
      ],
      yourRights: [
        "Right to reside in the shared household, whether or not she has any right, title or interest in it.",
        "Right to obtain Protection Orders preventing the husband from contacting or approaching her.",
        "Right to claim monetary relief, maintenance, and temporary custody of children.",
        "Right to free legal aid from State Legal Services Authority."
      ],
      evidenceNeeded: [
        "Medical records / physical injury reports (if any).",
        "Audio / Video recordings of threats or abuse.",
        "WhatsApp messages, emails, or call logs showing abusive remarks.",
        "Statements of neighbors or family members who witnessed the abuse."
      ],
      nextSteps: [
        "Contact the national domestic violence helpline **181** or police at **112** for emergency protection.",
        "File a Domestic Incident Report (DIR) through a local Protection Officer or Service Provider.",
        "Approach the Magistrate's court to request an immediate Protection Order or Residence Order."
      ],
      govResources: [
        { name: "National Commission for Women", description: "Support, legal assistance, and complaints cell.", url: "http://ncw.nic.in" },
        { name: "Nalsa Free Legal Aid", description: "Get free legal assistance from government advocates.", url: "https://nalsa.gov.in" }
      ],
      notes: "Your safety is paramount. If you feel in immediate danger, leave the house or contact the police immediately. Keep copies of your identity documents in a safe place.",
      disclaimer: "NyayaAI is an AI-powered assistant. This advice is for information purposes and does not constitute formal legal advice."
    }
  },
  "I want to register a trademark.": {
    content: "Trademark registration protects your brand name, logo, or slogan. It grants exclusive rights and legal protection nationwide.",
    sections: {
      situationSummary: "Filing an application to register a brand name, logo, or trademark for business operations.",
      relevantLaws: [
        "**Trademarks Act, 1999**: Governs registration, protection, and infringement of trademarks in India.",
        "**Trademark Rules, 2017**: Procedures, application fees, and timeline compliance."
      ],
      yourRights: [
        "Right to use the ® symbol once the trademark is officially registered.",
        "Exclusive right to use the brand name for specified classes of goods/services.",
        "Right to take legal action (infringement suit) and claim damages against unauthorized copies."
      ],
      evidenceNeeded: [
        "Logo graphic in JPEG/PNG format.",
        "Date of first use of the trademark (User Affidavit is required if claiming prior use).",
        "Business Registration Proof (MSME, Partnership, or Incorporation certificate to claim lower filing fee)."
      ],
      nextSteps: [
        "Conduct a thorough Trademark Search on the official IP India public search portal.",
        "Prepare and file Form TM-A online on the e-filing portal.",
        "Monitor the application status for Examination Reports or third-party oppositions."
      ],
      govResources: [
        { name: "IP India Online Filing", description: "Official intellectual property registration portal.", url: "https://ipindiaonline.gov.in" },
        { name: "Trademark Public Search", description: "Search existing registered trademarks.", url: "https://ipindiaservices.gov.in/tmrpublicsearch/" }
      ],
      notes: "Individual/Startup filing fees are ₹4,500, while corporate filing fees are ₹9,000. It is highly recommended to obtain an MSME certificate to avail the 50% discount.",
      disclaimer: "NyayaAI is an AI-powered assistant. This advice is for information purposes and does not constitute formal legal advice."
    }
  }
};

export const MOCK_RIGHTS_RESPONSES = {
  "I was fired today.": {
    rights: [
      "Right to notice period (typically 30-90 days as per contract) or salary in lieu of notice.",
      "Right to receive full and final settlement (F&F) within 48 hours of termination under labor laws.",
      "Right to encashment of unused accrued privilege leaves.",
      "Right to Gratuity (if you completed 5 years of continuous service)."
    ],
    laws: [
      "**Industrial Disputes Act, 1947 (Section 25F)**: Retrenchment conditions.",
      "**Shops and Establishments Act** (State-specific notice guidelines).",
      "**Payment of Gratuity Act, 1972**."
    ],
    compensation: "15 days' average pay for every completed year of continuous service as retrenchment compensation, plus notice period salary.",
    documents: [
      "Appointment Letter / Employment Agreement",
      "Termination Letter stating the reason",
      "Salary slips for the last 6 months",
      "Form 16 / PF account ledger summary"
    ],
    timeline: "Full and Final settlement must be cleared within 2 working days. Gratuity must be paid within 30 days.",
    offices: "Office of the District Labor Commissioner / Labor Inspector."
  }
};

export const MOCK_DOCUMENT_EXPLAINER = {
  summary: "This is a Standard Residential Lease Agreement between the landlord (Lessor) and tenant (Lessee) for a tenure of 11 months. The rent is payable monthly, and a security deposit equivalent to 3 months of rent is locked.",
  importantClauses: [
    "**Clause 4 (Rent Escalation)**: Specifies a fixed 10% rent increment upon renewal after 11 months.",
    "**Clause 7 (Notice Period)**: Mandates 2 months written notice from either party before termination.",
    "**Clause 12 (Maintenance Charges)**: Specifies society maintenance is payable by the tenant, whereas structural repairs are the landlord's duty."
  ],
  hiddenRisks: [
    "**Auto-Renewal Lock**: Clause 14 notes that if the tenant fails to send a vacate notice exactly 60 days prior, the lease auto-renews with the 10% hike locked in, potentially triggering exit penalties."
  ],
  unfairClauses: [
    "**Unilateral Penalty (Clause 9.3)**: If tenant defaults on rent by 5 days, landlord can terminate immediately and forfeit the entire security deposit. Conversely, no penalty exists if landlord defaults on repairs."
  ],
  responsibilities: [
    "**Tenant**: Routine cleaning, electrical bulb replacements, minor repairs, paying utility bills on time.",
    "**Landlord**: Major structural repairs, roofing, water tank cleaning, property tax payments."
  ],
  rights: [
    "Tenant has the right to quiet enjoyment without landlord entering the property without a 24-hour prior notice.",
    "Tenant has the right to basic amenities (water, electricity connections)."
  ],
  terminationConditions: [
    "Requires 2 months notice from either side.",
    "Immediate termination if rent is unpaid for 2 consecutive months.",
    "Property is destroyed by natural calamity."
  ],
  financialObligations: [
    "Monthly Rent: ₹25,000 (due by 5th of each month).",
    "Security Deposit: ₹75,000 (Refundable).",
    "Late fee: ₹500 per day of delay."
  ]
};

export const MOCK_GOV_SERVICES = [
  {
    id: "passport",
    name: "Passport Application",
    eligibility: "Indian Citizens, Minimum age 18 for adult passport (minor passport for below 18).",
    documents: ["Proof of Address (Aadhaar, Utility bill, Bank passbook)", "Proof of Date of Birth (Birth certificate, Matriculation certificate)"],
    fees: "₹1,500 for Normal (36 pages); ₹3,500 for Tatkaal.",
    timeline: "Normal: 15-30 days (subject to police verification); Tatkaal: 3-7 days.",
    url: "https://www.passportindia.gov.in"
  },
  {
    id: "driving-licence",
    name: "Driving Licence",
    eligibility: "Age 16 for gearless two-wheeler; Age 18 for light motor vehicles (geared). Must hold Learner's Licence.",
    documents: ["Learner's Licence number", "Address Proof", "Age Proof", "Form 1 (Medical Certificate for >40 age)"],
    fees: "₹200 for Test; ₹200 for License issue.",
    timeline: "Issued within 10-15 days after passing the driving test.",
    url: "https://sarathi.parivahan.gov.in"
  },
  {
    id: "gst-reg",
    name: "GST Registration",
    eligibility: "Businesses with turnover >₹40 Lakhs (goods) or >₹20 Lakhs (services). Mandatory for interstate sales.",
    documents: ["PAN card of Business", "Aadhaar Card of promoter", "Proof of business address", "Bank statement copy"],
    fees: "Government fee is ₹0 (Free on portal).",
    timeline: "Approved within 3-7 working days.",
    url: "https://www.gst.gov.in"
  },
  {
    id: "trademark",
    name: "Trademark Filing",
    eligibility: "Individuals, Startups, Partnerships, or Private Limited Companies.",
    documents: ["Logo artwork", "Form TM-48 (Authorization)", "Proof of business registration (MSME certificate)"],
    fees: "₹4,500 for Individuals/Startups; ₹9,000 for Corporations.",
    timeline: "Register takes 6-12 months (starts using TM tag instantly upon application).",
    url: "https://ipindiaonline.gov.in"
  },
  {
    id: "marriage-reg",
    name: "Marriage Registration",
    eligibility: "Groom age >= 21; Bride age >= 18. Witnesses required.",
    documents: ["Proof of Birth of both parties", "Address proof", "Marriage invitation card or temple receipt", "2 Witnesses with Aadhaar"],
    fees: "₹100 (Hindu Marriage Act); ₹150 (Special Marriage Act).",
    timeline: "Certificate issued in 15 days (Hindu Act) or 30 days (Special Act).",
    url: "https://serviceonline.gov.in"
  },
  {
    id: "property-reg",
    name: "Property Deeds Registration",
    eligibility: "Buyer and Seller of real estate property.",
    documents: ["Sale Deed", "Property tax card", "ID proof of buyer, seller, and 2 witnesses", "PAN card"],
    fees: "Stamp Duty (4-7% of property value state-wise) + Registration fee (1%).",
    timeline: "Completed in 1 day at the Sub-Registrar office.",
    url: "https://ngdrsonline.gov.in"
  },
  {
    id: "msme-reg",
    name: "MSME (Udyam) Registration",
    eligibility: "Micro, Small, and Medium enterprises.",
    documents: ["Aadhaar Card of owner/promoter", "PAN Card of business", "Bank Account Details"],
    fees: "Free of charge.",
    timeline: "Instant generation of Udyam Certificate.",
    url: "https://udyamregistration.gov.in"
  },
  {
    id: "startup-india",
    name: "Startup India Recognition",
    eligibility: "Incorporated as Pvt Ltd or LLP, age < 10 years, turnover < ₹100 Crores, working on innovation.",
    documents: ["Certificate of Incorporation", "Write-up explaining the innovative nature of business", "Pitch deck / Website link"],
    fees: "Free of charge.",
    timeline: "Evaluated and approved within 15-20 days.",
    url: "https://www.startupindia.gov.in"
  }
];

export const MOCK_HISTORY = [
  { id: "1", title: "Unpaid Salary Claim - TechCorp", date: "2026-07-01", type: "chat" },
  { id: "2", title: "Lease Agreement Review", date: "2026-06-28", type: "document" },
  { id: "3", title: "Cyber Fraud Scam Complaint", date: "2026-06-25", type: "complaint" }
];

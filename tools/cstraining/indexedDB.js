// indexedDB.js - Handles storing and retrieving quiz data in IndexedDB

const DB_NAME = "CyberSecurityTrainingDB";
const DB_VERSION = 1;
const INDUSTRIES_STORE = "industries";
const ROLES_STORE = "roles";
const QUESTIONS_STORE = "questions";

// Open or create IndexedDB database
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            // Create Industries Store
            if (!db.objectStoreNames.contains(INDUSTRIES_STORE)) {
                const industryStore = db.createObjectStore(INDUSTRIES_STORE, { keyPath: "id", autoIncrement: true });
                industryStore.createIndex("name", "name", { unique: true });
            }

            // Create Roles Store (Each role is linked to an industry)
            if (!db.objectStoreNames.contains(ROLES_STORE)) {
                const roleStore = db.createObjectStore(ROLES_STORE, { keyPath: "id", autoIncrement: true });
                roleStore.createIndex("industry_id", "industry_id", { unique: false });
                roleStore.createIndex("name", "name", { unique: false });
            }

            // Create Questions Store (Each question is linked to an industry & role)
            if (!db.objectStoreNames.contains(QUESTIONS_STORE)) {
                const questionStore = db.createObjectStore(QUESTIONS_STORE, { keyPath: "id", autoIncrement: true });
                questionStore.createIndex("industry_id", "industry_id", { unique: false });
                questionStore.createIndex("role_id", "role_id", { unique: false });
                questionStore.createIndex("question", "question", { unique: false });
                questionStore.createIndex("options", "options", { unique: false });
                questionStore.createIndex("correct_answer", "correct_answer", { unique: false });
                questionStore.createIndex("incident", "incident", { unique: false });
            }
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            seedDatabase(db); // Seed data if needed
            resolve(db);
        };

        request.onerror = function (event) {
            reject("Error opening database: " + event.target.errorCode);
        };
    });
}

// Function to add data to IndexedDB (Generic for all stores)
function addData(storeName, data) {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        
        const request = store.add(data);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error adding data: " + request.error);
    });
}

// Function to retrieve all data from a store
function getAllData(storeName) {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error fetching data: " + request.error);
    });
}

// Function to seed initial data
async function seedDatabase(db) {
    const transaction = db.transaction([INDUSTRIES_STORE, ROLES_STORE, QUESTIONS_STORE], "readwrite");
    const industryStore = transaction.objectStore(INDUSTRIES_STORE);
    const roleStore = transaction.objectStore(ROLES_STORE);
    const questionStore = transaction.objectStore(QUESTIONS_STORE);

    // Check if data already exists
    const industryCount = await industryStore.count();
    if (industryCount > 0) return;

    // Seed industries
    const industries = [
        { id: 1, name: "IT" },
        { id: 2, name: "Finance" },
        { id: 3, name: "Healthcare" }
    ];
    industries.forEach(industry => industryStore.add(industry));

    // Seed roles
    const roles = [
        { id: 1, industry_id: 1, name: "Developer" },
        { id: 2, industry_id: 1, name: "Security Analyst" },
        { id: 3, industry_id: 2, name: "Financial Auditor" },
        { id: 4, industry_id: 3, name: "Doctor" }
    ];
    roles.forEach(role => roleStore.add(role));

    // Seed questions
    const questions = [
        {
            industry_id: 1, role_id: 1,
            question: "What should you do if you receive an unexpected system access request?",
            options: ["Grant access", "Ignore", "Verify with IT", "Report to security"],
            correct_answer: "Verify with IT",
            incident: "A software engineer at a major IT firm granted access to a malicious request, leading to a data breach."
        },
        {
            industry_id: 2, role_id: 3,
            question: "A client asks you to alter financial records. What should you do?",
            options: ["Comply to maintain good relations", "Report to compliance", "Ignore", "Discuss with peers"],
            correct_answer: "Report to compliance",
            incident: "A financial auditor exposed fraudulent activities after refusing to manipulate records."
        },
        {
            industry_id: 3, role_id: 4,
            question: "What is the best practice for securing patient data?",
            options: ["Share records over email", "Use encrypted systems", "Keep physical copies", "Discuss openly in meetings"],
            correct_answer: "Use encrypted systems",
            incident: "A healthcare provider was fined for sharing patient data over unsecured channels."
        }
    ];
    questions.forEach(question => questionStore.add(question));
}

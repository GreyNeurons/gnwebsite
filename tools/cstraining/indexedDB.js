// indexedDB.js - Handles storing and retrieving quiz data in IndexedDB

const DB_NAME = "CyberSecurityTrainingDB";
const DB_VERSION = 2;
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

        request.onsuccess = async function (event) {
            const db = event.target.result;
            console.log("IndexedDB opened successfully.");

            const transaction = db.transaction(INDUSTRIES_STORE, "readonly");
            const industryStore = transaction.objectStore(INDUSTRIES_STORE);
            const industryCount = await industryStore.count();

            if (industryCount === 0) {
                console.log("Seeding full data (new user).");
                await seedDatabase(db);
            } else {
                console.log("Clearing all records and reseeding (upgrade).");
                await clearAllRecords(db)
                await seedDatabase(db);
            }

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

async function clearAllRecords(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([INDUSTRIES_STORE, ROLES_STORE, QUESTIONS_STORE], "readwrite");

        transaction.objectStore(INDUSTRIES_STORE).clear();
        transaction.objectStore(ROLES_STORE).clear();
        transaction.objectStore(QUESTIONS_STORE).clear();

        transaction.oncomplete = () => {
            console.log("All records cleared successfully.");
            resolve();
        };

        transaction.onerror = (event) => {
            console.error("Error clearing records: ", event.target.error);
            reject(event.target.error);
        };
    });
}
// Function to seed initial data
async function seedDatabase(db) {
    const transaction = db.transaction([INDUSTRIES_STORE, ROLES_STORE, QUESTIONS_STORE], "readwrite");
    const industryStore = transaction.objectStore(INDUSTRIES_STORE);
    const roleStore = transaction.objectStore(ROLES_STORE);
    const questionStore = transaction.objectStore(QUESTIONS_STORE);

    const industryCount = await industryStore.count();
    if (industryCount > 0) return;

    const industries = [
        { id: 1, name: "IT" },
        { id: 2, name: "Finance" },
        { id: 3, name: "Healthcare" },
        { id: 4, name: "Retail" },
        { id: 5, name: "Manufacturing" }
    ];
    industries.forEach(industry => industryStore.add(industry));

    const roles = [
        { id: 1, industry_id: 1, name: "Developer" },
        { id: 2, industry_id: 1, name: "Security Analyst" },
        { id: 3, industry_id: 2, name: "Financial Auditor" },
        { id: 4, industry_id: 2, name: "Risk Manager" },
        { id: 5, industry_id: 3, name: "Doctor" },
        { id: 6, industry_id: 3, name: "Nurse" },
        { id: 7, industry_id: 4, name: "Store Manager" },
        { id: 8, industry_id: 4, name: "Cashier" },
        { id: 9, industry_id: 5, name: "Factory Supervisor" },
        { id: 10, industry_id: 5, name: "Supply Chain Manager" }
    ];
    roles.forEach(role => roleStore.add(role));

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
            industry_id: 3, role_id: 5,
            question: "What is the best practice for securing patient data?",
            options: ["Share records over email", "Use encrypted systems", "Keep physical copies", "Discuss openly in meetings"],
            correct_answer: "Use encrypted systems",
            incident: "A healthcare provider was fined for sharing patient data over unsecured channels."
        },
        {
            industry_id: 4, role_id: 7,
            question: "A customer reports fraudulent activity on their card at your store. What should you do?",
            options: ["Ignore the report", "Notify security", "Investigate on your own", "Ask them to contact their bank"],
            correct_answer: "Notify security",
            incident: "A cashier ignored multiple fraud complaints, leading to significant losses."
        },
        {
            industry_id: 5, role_id: 9,
            question: "What should you do if you detect malware on factory production machines?",
            options: ["Ignore and restart", "Report to IT", "Download antivirus", "Continue production"],
            correct_answer: "Report to IT",
            incident: "A malware attack on an industrial plant disrupted operations for two days, costing millions."
        }
    ];
    questions.forEach(question => questionStore.add(question));
}

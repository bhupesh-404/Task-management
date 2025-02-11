import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import algoliasearch from "algoliasearch"
import { collection, getDocs, getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MESAUREMENT_ID
}

const client = algoliasearch(
  import.meta.env.VITE_ALGOILI_APP_ID,
  import.meta.env.VITE_ALGOLI_APP_KEY
)
const algoliaIndex = client.initIndex("tasks")
algoliaIndex.setSettings({
  attributesForFaceting: [
    "taskStatus",
    "taskCategory",
    "dueOn",
    "dueOnTimeStamp"
  ],
  searchableAttributes: [
    "taskName",
    "dueOn",
    "taskStatus",
    "taskCategory",
    "description"
  ],
  numericAttributesForFiltering: ["dueOnTimeStamp.seconds"]
})
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const syncFirestoreToAlgolia = async () => {
  const tasksSnapshot = await getDocs(collection(getFirestore(), "tasks"))
  const tasks = tasksSnapshot.docs.map(doc => ({
    objectID: doc.id,
    ...doc.data()
  }))

  await algoliaIndex.saveObjects(tasks)
  console.log("Firestore data synced with Algolia!")
}

export { auth, provider, syncFirestoreToAlgolia, algoliaIndex }

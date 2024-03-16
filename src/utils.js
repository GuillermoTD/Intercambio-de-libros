export const fetchDocuments = async(collectionMethod,firebaseDB,getDocs,collectionName)=>{
    const docsCollectionRef = collectionMethod(firebaseDB,collectionName)
    const querySnapshot = await getDocs(docsCollectionRef)
    const docsArray = querySnapshot?.docs?.map((doc)=>doc?.data())
    console.log(docsArray)
    return docsArray
}
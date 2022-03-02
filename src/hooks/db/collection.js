import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  runTransaction,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useMounted } from "..";

function useCollection(collec) {
  const [data, setData] = useState(null);
  const { pathname } = useLocation();
  const mounted = useMounted();

  const fetchCollectionData = useCallback(() => {
    const loadData = async () => {
      const querySnapshot = await getDocs(collection(db, collec));
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      if (mounted.current) {
        setData(docs);
      }
    };
    loadData();
  }, [collec, mounted]);

  const add = useCallback(
    (data) => {
      addDoc(collection(db, collec), data);
    },
    [collec]
  );

  const edit = useCallback(
    (id, data) => {
      return setDoc(doc(db, collec, id), data);
    },
    [collec]
  );

  const remove = useCallback(
    async (id) => {
      await deleteDoc(doc(db, collec, id));
      fetchCollectionData();
    },
    [collec, fetchCollectionData]
  );

  const removePizzaSize = useCallback(
    async (id) => {
      const pizzaSizeRef = doc(db, "pizzasSizes", id);

      await runTransaction(db, async (transaction) => {
        const sizeDoc = await transaction.get(pizzaSizeRef);
        if (!sizeDoc.exists) {
          throw new Error("Esse tamanho não existe");
        }

        transaction.delete(pizzaSizeRef);

        const allFlavours = await getDocs(collection(db, "pizzasFlavours"));
        allFlavours.forEach((flavour) => {
          const { [id]: sizeId, ...value } = flavour.data().value;
          const flavourRef = doc(db, "pizzasFlavours", flavour.id);

          transaction.update(flavourRef, { value });
        });
      })
        .then(() => {
          console.log("finalizou transaction com sucesso");
          fetchCollectionData();
        })
        .catch((e) => {
          console.log("deu erro na transaction: ", e);
        });
    },
    [fetchCollectionData]
  );

  useEffect(() => {
    fetchCollectionData();
  }, [pathname, fetchCollectionData]);

  return { data, add, remove, edit, removePizzaSize };
}

export default useCollection;

import { useEffect, useState, useMemo, useCallback } from "react";
import { db } from "../../services/firebase";
import {
  getDocs,
  collection,
  setDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { useMounted } from "..";

function useOrders() {
  const [orders, setOrders] = useState(null);
  const mounted = useMounted();

  const status = useMemo(
    () => ({
      pending: "pending",
      inProgress: "inProgress",
      outForDelivery: "outForDelivery",
      delivered: "delivered",
    }),
    []
  );

  const getOrders = useCallback(() => {
    const ordersRef = collection(db, "orders");
    const queryRef = query(ordersRef, orderBy("createdAt", "asc"));

    const loadData = async () => {
      const querySnapshot = await getDocs(queryRef);
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const initialStatus = Object.keys(status).reduce((acc, status) => {
        acc[status] = [];
        return acc;
      }, {});

      if (!mounted.current) {
        return;
      }

      setOrders(
        docs.reduce((acc, doc) => {
          const mainStatus = doc.status || status.pending;

          return {
            ...acc,
            [mainStatus]: acc[mainStatus].concat(doc),
          };
        }, initialStatus)
      );
    };
    loadData();
  }, [status, mounted]);

  const updateOrder = useCallback(
    async ({ orderId, status }) => {
      await setDoc(doc(db, "orders", orderId), { status }, { merge: true });
      getOrders();
    },
    [getOrders]
  );

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return { orders, status, updateOrder };
}

export default useOrders;

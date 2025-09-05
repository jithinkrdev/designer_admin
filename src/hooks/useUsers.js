import { useState, useEffect, useCallback } from "react";
import api from "../api/config";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("access_token");
      const res = await api.get("/subscription/all", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      const mapped = res.data.map((item) => ({
        id: item.user._id,
        username: item.user.email,
        quota: item.subscription?.availableQuata ?? "-",
        subStart: item.subscription?.subscriptionDate
          ? new Date(item.subscription.subscriptionDate)
              .toISOString()
              .slice(0, 10)
          : "-",
        subEnd: item.subscription?.expiryDate
          ? new Date(item.subscription.expiryDate).toISOString().slice(0, 10)
          : "-",
      }));
      setUsers(mapped);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (newUser) => {
      try {
        const token = localStorage.getItem("access_token");
        const payload = {
          email: newUser.email,
          password: newUser.password,
          brandName: newUser.brandName,
          phoneNumber: newUser.phoneNumber,
          isActive: newUser.isActive,
          role: newUser.role,
          address: newUser.address,
        };
        await api.post("/auth/create-user", payload, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        await fetchUsers();
      } catch (err) {
        // Optionally handle error
      }
    },
    [fetchUsers]
  );

  const editUser = useCallback(async (editUser) => {
    try {
      const token = localStorage.getItem("access_token");
      const payload = {
        availableQuata: editUser.quota,
        totalHits: editUser.totalHits,
        subscriptionType: editUser.subscriptionType || "basic",
        subscriptionDate: editUser.subStart,
        expiryDate: editUser.subEnd,
      };
      await api.put(`/subscription/${editUser.id}`, payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? editUser : u))
      );
    } catch (err) {
      // Optionally handle error
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    // Optionally call API to delete user here
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    setUsers,
    fetchUsers,
    createUser,
    editUser,
    deleteUser,
  };
}

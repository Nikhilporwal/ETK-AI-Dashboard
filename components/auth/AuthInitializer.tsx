"use client";

import { useEffect, useRef } from "react";
import { JobFormData, useGlobalContext } from "@/context/JobContext";

export default function AuthInitializer({ data, user_id }: { data: JobFormData, user_id: string }) {
    const { setFormData, setUserDetails } = useGlobalContext();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current && data) {
            if (data) {
                setFormData(data);
            }
            setUserDetails({ user_id });
            initialized.current = true;
        }
    }, [data, setFormData, user_id, setUserDetails]);

    return null;
}
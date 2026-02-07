import { useState, useEffect, useCallback } from 'react';
import { CareerManager } from '@/services/CareerManager';
import { StudentProfile, CareerReality, RealityId } from '@/types/career';

export const useCareer = () => {
    const [profile, setProfile] = useState<StudentProfile>(CareerManager.getProfile());
    const [activeReality, setActiveReality] = useState<CareerReality | undefined>(
        CareerManager.getActiveReality()
    );

    // Sync state with local storage updates
    const refresh = useCallback(() => {
        const p = CareerManager.getProfile();
        setProfile(p);
        setActiveReality(p.realities.find(r => r.id === p.activeRealityId));
    }, []);

    useEffect(() => {
        window.addEventListener('career-profile-updated', refresh);
        return () => window.removeEventListener('career-profile-updated', refresh);
    }, [refresh]);

    const forkReality = (sourceId: RealityId, newName: string) => {
        const newReality = CareerManager.forkReality(sourceId, newName);
        refresh();
        return newReality;
    };

    const switchReality = (id: RealityId) => {
        CareerManager.switchReality(id);
        refresh();
    };

    return {
        profile,
        activeReality,
        forkReality,
        switchReality,
        refresh
    };
};

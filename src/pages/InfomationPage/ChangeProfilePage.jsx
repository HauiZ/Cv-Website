import React from 'react';
import PersonalInfoForm2 from './PersonalInfoForm2';
import Introduce from './Introduce';

export default function ChangeProfilePage() {
    return (
        <div className="flex container mx-auto py-6 px-4 justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-5">
                <div className="">
                    <PersonalInfoForm2 />
                </div>
                <div className="flex justify-center">
                    <Introduce />
                </div>
            </div>
        </div>
    );
}
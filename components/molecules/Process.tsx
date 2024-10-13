import React from 'react';

type ProcessProps = {
    processes: string[];
    onDelete: (index: number) => void; 
};

const ProcessList: React.FC<ProcessProps> = ({ processes, onDelete }) => {
    return (
        <ul className="list-disc">
            {processes.map((process, index) => (
                <li key={index} className="flex items-center py-1">
                    <span>{process}</span>
                    <button 
                        className="text-red-500 text-xs ml-2" 
                        onClick={() => onDelete(index)}
                    >
                        삭제
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ProcessList;

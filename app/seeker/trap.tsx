
interface Job {
    status: string;
    id: number;
    applicantId: number;
    jobId: number;
    appliedAt: Date;
}

interface Application {
    applicationting: Job[]
}

export default function Trap({applicationting} : Application) {

    return (
        <>
        </>
    )
}
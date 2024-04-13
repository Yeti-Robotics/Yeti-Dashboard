import { Widget } from "@/app/widgets/components/Widget";


export function TabDashboard({ id }: { id: string }) {
    return (
        <div>
            <div>
                {id}
            </div>
            <div>
                <Widget />  
            </div>
        </div>
    );
}
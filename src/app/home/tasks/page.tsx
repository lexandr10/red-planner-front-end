
import { Metadata } from "next";


import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Heading } from "@/components/Heading";
import TasksView from "./TasksView";
import ListView from "./list-view/ListView";


export const metadata: Metadata = {
    title: "Tasks",
    ...NO_INDEX_PAGE
}

const TasksPage = () => {
    return <div>
        <Heading title="Tasks" />
        <ListView/>
    </div>
}

export default TasksPage
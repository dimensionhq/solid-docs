import { Link } from "solid-app-router";
import Base from "~/components/docs";

const Index = () => {
    return (
        <div>
            Home!
            <div >
                Visit <Link href="/docs/introduction">Introduction</Link>
            </div>
        </div>
    )
}
export default Index;
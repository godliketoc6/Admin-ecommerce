import Layout from "@/components/Layout";

export default function Warehouse(){
    return(
        <Layout>
            <form>
            <h1> Create warehouse </h1>
            <label> Warehouse name </label>
            <input type="text" placeholder="Name" />
            <label> Province </label>
            <input type="text" placeholder="Province" />
            <label> City </label>
            <input type="text" placeholder="City" />
            <label> District </label>
            <input type="text" placeholder="District" />
            <label> Street </label>
            <input type="text" placeholder="Street" />
            <label> Number </label>
            <input type="text" placeholder="Number" />
            <label> Capacity </label>
            <input type="text" placeholder="Capacity" />
            <button type="submit "className="btn-primary"> Create </button>
            </form>
        </Layout>
    );
}
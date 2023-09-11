import Layout from "@/components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { IconEdit } from '@tabler/icons-react';
import { IconEraser } from '@tabler/icons-react';

export default function Products() {
    const [products,setProducts] = useState([]);

    useEffect(() => {
    axios.get('/api/products').then(response => {
        setProducts(response.data);
    });
    }, []);

    return(
        <Layout>
            <Link className="bg-blue-900 text-white rounded-md py-1 px-2" href={'/products/new'}>
                Add new product
            </Link>
                <table className="basic mt-2">
                    <thead>
                        <tr key={products._id}>
                            <td>Product name</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>
                                    <Link href={'/products/edit/'+product._id}>
                                        <IconEdit />
                                        Edit
                                    </Link>
                                    <Link href={'/products/delete/'+product._id}>
                                        <IconEraser />
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </Layout>
    );
}
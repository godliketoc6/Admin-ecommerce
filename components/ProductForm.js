import { useState, useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import { IconUpload } from '@tabler/icons-react';
import Spinner from "@/components/Spinner";
import {ReactSortable} from "react-sortablejs";

export default function ProductForm({_id,title:existingTitle, description:existingDescription, price:existingPrice,images:existingImages, category:assignedCategory, properties:assignedProperties,}) {
  const [title,setTitle] = useState(existingTitle || '');
  const [description,setDescription] = useState(existingDescription || '');
  const [category,setCategory] = useState(assignedCategory || '');
  const [price,setPrice] = useState(existingPrice || '');
  const [images,setImages] = useState(existingImages || []);
  const [isUploading,setIsUploading] = useState(false);
  const [categories,setCategories] = useState([]);
  const [productProperties,setProductProperties] = useState(assignedProperties || {});
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    })
  }, []);

  async function createProduct(e) {
    e.preventDefault();
    const data = {title, description, price, images, category, properties:productProperties};
    if (_id) {
      //update
      const response = await axios.put('/api/products', {...data,_id});
      // console.log(response)
      if(response.status === 200){
        router.push('/products');
      }
    } else {
      //create
      const response = await axios.post('/api/products', data);
      // console.log(response)
      if(response.status === 200){
        router.push('/products');
      }
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProp(propName,value) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files){
        data.append('file', file);
      }
      const res = await axios.post('/api/upload',data);
      // console.log(res.data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  const propertiesToFill = [];
  if(categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while(catInfo?.parent?._id){
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
      <form onSubmit={createProduct}>
      <label> Product Name </label>
      <input type="text" placeholder="product name" value={title} onChange={e => setTitle(e.target.value)}/>
      <label> Category </label>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 && categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
            <div>
              <select value={productProperties[p.name]}
                      onChange={ev =>
                        setProductProp(p.name,ev.target.value)
                      }
              >
                {p.values.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label>
        Images
      </label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
          {!!images?.length && images.map(link => (
              <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={link} alt="" className="rounded-lg"/>
              </div>
          ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
        <label className="w-24 h-24 border text-center flex items-center justify-content text-sm gap-1 text-grey-500 rounded-lg bg-grey-200">
          <IconUpload /> 
          <div>Upload</div>
        <input type="file" onChange={uploadImages} className="hidden"/>
        </label>
      </div>
      <label> Description </label>
      <textarea placeholder="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
      <label> Price (in USD)</label>
      <input type="number" placeholder="price" value={price} onChange={e => setPrice(e.target.value)}/>
      <button type="submit "className="btn-primary"> Save </button>
      </form>
  );
}
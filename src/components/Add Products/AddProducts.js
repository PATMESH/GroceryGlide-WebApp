import React, { useState } from 'react';
import { db , storage } from '../../Config/Config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
var categories = require('./categories.json');

export const AddProducts = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState(''); 
  const [subCategory, setSubCategory] = useState(''); 
  const [productPrice, setProductPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(''); 
  const [productDescription, setProductDescription] = useState(''); 
  const [productQuantity, setProductQuantity] = useState(''); 
  const [productImg1, setProductImg1] = useState(null);
  const [productImg2, setProductImg2] = useState(null);
  const [productImg3, setProductImg3] = useState(null);
  const [error, setError] = useState('');

  const handleSuccessClick = () => {
    Swal.fire('Success!', 'Your Product added successfully', 'success');
    setTimeout(() => {
      navigate(0);
    }, 2000);
  };

  const types = ['image/png', 'image/jpeg'];

  const productImgHandler1 = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg1(selectedFile);
      setError('');
    } else {
      setProductImg1(null);
      setError('Please select a valid image type (jpg or png)');
    }
  }
  const productImgHandler2 = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg2(selectedFile);
      setError('');
    } else {
      setProductImg2(null);
      setError('Please select a valid image type (jpg or png)');
    }
  }
  const productImgHandler3 = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg3(selectedFile);
      setError('');
    } else {
      setProductImg3(null);
      setError('Please select a valid image type (jpg or png)');
    }
  }

  const onSearchCategory = (searchTerm) => {
    setCategory(searchTerm);
  };
  const onSearchSubCategory = (searchTerm) => {
    setSubCategory(searchTerm);
  };

  const addProduct = (e) => {
    e.preventDefault();
    const uploadTask1 = storage.ref(`product-images/${productImg1.name}`).put(productImg1);
    uploadTask1.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => setError(err.message),
      () => {
        storage.ref('product-images').child(productImg1.name).getDownloadURL().then((url1) => {
          const uploadTasks = [];
          if (productImg2) {
            uploadTasks.push(storage.ref(`product-images/${productImg2.name}`).put(productImg2));
          }
          if (productImg3) {
            uploadTasks.push(storage.ref(`product-images/${productImg3.name}`).put(productImg3));
          }
          Promise.all(uploadTasks).then(() => {
            const urls = [url1];
            if (productImg2) urls.push(storage.ref('product-images').child(productImg2.name).getDownloadURL());
            if (productImg3) urls.push(storage.ref('product-images').child(productImg3.name).getDownloadURL());

            Promise.all(urls).then((downloadUrls) => {
              const productData = {
                ProductName: productName,
                Category: category,
                SubCategory: subCategory,
                ProductPrice: Number(productPrice),
                DiscountPercentage: Number(discountPercentage),
                productQuantity: productQuantity,
                ProductDescription: productDescription,
                ProductImages: downloadUrls,
              };
              
              db.collection('Products')
                .add(productData)
                .then(() => {
                  setProductName('');
                  setCategory('');
                  setSubCategory('');
                  setProductPrice('');
                  setDiscountPercentage('');
                  setProductDescription('');
                  setProductQuantity('');
                  setProductImg1(null);
                  setProductImg2(null);
                  setProductImg3(null);
                  setError('');
                  handleSuccessClick();
                  document.getElementById('file').value = null;
                })
                .catch((err) => setError(err.message));
            });
          });
        });
      }
    );
  }

  return (
    <div className='product-add-container'>
      <h2>ADD PRODUCTS</h2>
      <hr />
      <form autoComplete='off' className='form-group' onSubmit={addProduct}>
        <label htmlFor='product-name'>Product Name</label>
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <label htmlFor='category'>Category</label>
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <div className="dropdown">
          {categories
            .filter((item) => {
              const searchTerm = category.toLowerCase();
              const fullName = item.name.toLowerCase();
              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearchCategory(item.name)}
                className="dropdown-row"
                key={item.name}
              >
                {item.name}
              </div>
            ))}
        </div>
        <label htmlFor='sub-category' >Subcategory</label>
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setSubCategory(e.target.value)}
          value={subCategory}
        />
        <div className="dropdown">
          {categories
            .filter((item) =>subCategory&& item.name === category)
            .map((item) => (
              item.subcategories.filter((sub) => (sub.toLowerCase()).startsWith(subCategory.toLowerCase()) && sub !== subCategory).map((subCategory) => (
                <div
                  onClick={() => onSearchSubCategory(subCategory)}
                  className="dropdown-row"
                  key={subCategory}
                >
                  {subCategory}
                </div>
              ))
            ))}
       </div>

        <label htmlFor='product-price'>Original Price</label>
        <input
          type='number'
          className='form-control'
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <label htmlFor='discount-percentage'>Discount Percentage (%)</label>
        <input
          type='number'
          className='form-control'
          required
          onChange={(e) => setDiscountPercentage(e.target.value)}
          value={discountPercentage}
        />
        <label htmlFor='product-quantity'>Product Quantity</label>
        <input
          type='text'
          className='form-control'
          required
          onChange={(e) => setProductQuantity(e.target.value)}
          value={productQuantity}
        />

        <label htmlFor='product-description'>Product Description</label>
        <textarea
          className='form-control'
          required
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
        />
        
        <label htmlFor='product-img1'>Product Image (Mandatory)</label>
        <input
          type='file'
          className='form-control'
          id='file'
          required
          onChange={productImgHandler1}
        />
        <label htmlFor='product-img2'>Product Image 2 (Optional)</label>
        <input
          type='file'
          className='form-control'
          required
          onChange={productImgHandler2}
        />
        <label htmlFor='product-img3'>Product Image 3 (Optional)</label>
        <input
          type='file'
          className='form-control'
          onChange={productImgHandler3}
        />
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
        <button type='submit' className='btn btn-success btn-md mybtn'>
          ADD
        </button>
      </form>
    </div>
  );
}

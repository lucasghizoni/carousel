(function(document){
	const thatDoc = document;

    const thisDoc =  (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;
    const template = thisDoc.querySelector('template').content;

	class CustomProduct extends HTMLElement {
		
		createdCallback(){
			const shadowRoot = this.createShadowRoot();
	        const clone = thatDoc.importNode(template, true);
	        shadowRoot.appendChild(clone);

	        //creating references
	        this.linkContainer = this.shadowRoot.querySelector('a');
	        this.img = this.shadowRoot.querySelector('img');
	        this.description = this.shadowRoot.querySelector('.description');
	        this.price = this.shadowRoot.querySelector('.price');
	        this.conditions = this.shadowRoot.querySelector('.conditions');
		}

		setProductInfo(product){
			//this may be useful. store the object from server
			this.productData = product;
			
			this.linkContainer.href = product.detailUrl;
			this.img.src = product.imageName;
			this.description.textContent = product.name;
			this.price.innerHTML += "<strong>" + product.price + "</strong>";
			
			if(product.oldPrice){
				const oldPriceElm = document.createElement('span');
				oldPriceElm.textContent = "De: " + product.oldPrice;
				this.price.parentNode.insertBefore(oldPriceElm, this.price);
			}

			this.conditions.innerHTML = product.productInfo.paymentConditions;
			const secondStrongElm = this.conditions.querySelectorAll('strong')[1];
			secondStrongElm.textContent = 'R$' + secondStrongElm.textContent.replace('.', ',');

		}
	}

	document.registerElement('custom-product', CustomProduct);
})(document);
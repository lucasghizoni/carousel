(function(document){
	//the outer doc
	const thatDoc = document;

	//the inner doc, product-item.html
	const thisDoc =  (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;
	const template = thisDoc.querySelector('template').content;

	class CustomCarousel extends HTMLElement {
		
		createdCallback(){
			const shadowRoot = this.createShadowRoot();
	        const clone = thatDoc.importNode(template, true);
	        shadowRoot.appendChild(clone);

	        //creating a reference to ul tag.
	        this.ul = this.shadowRoot.querySelector('ul');

	        //adding listeners
	        this.shadowRoot.querySelector('.arrow-right').addEventListener('click', this._arrowRight.bind(this));
	        this.shadowRoot.querySelector('.arrow-left').addEventListener('click', this._arrowLeft.bind(this));
		}

		_arrowRight(){
			this.ul.classList.remove('carousel-reverse');
			this.lis.forEach( (li) => {
				li.style.order = li.style.order == 0 ? this.lis.length - 1 : Number(li.style.order) - 1;
			});
			this.ul.classList.add('carousel');
			this.ul.classList.remove('trans');
			setTimeout(() => this.ul.classList.add('trans'), 50);
		}

		_arrowLeft(){
			this.ul.classList.remove('carousel');
			this.lis.forEach( (li) => {
			li.style.order = li.style.order == this.lis.length - 1 ? 0 : Number(li.style.order) + 1;
			});
			this.ul.classList.add('carousel-reverse');
			this.ul.classList.remove('trans');
			setTimeout(() => this.ul.classList.add('trans'), 20);
		}

		setReference(product){
			const productRef = document.createElement('custom-product');
			productRef.setProductInfo(product);

			this.shadowRoot.querySelector("#reference").appendChild(productRef);
		}

		populateCarousel(products){
			this.lis = [];

			products.forEach((product, index) => {
				const li = document.createElement('li');
				li.classList.add('carousel-item');
				li.style.order = index;

				const productElm = document.createElement('custom-product');
				productElm.setProductInfo(product);
				li.appendChild(productElm);
				this.ul.appendChild(li);
				//creating a reference of lis
				this.lis.push(li);
			});
		}

	}
	// this is how we register a new webcomponent to be available in document
	document.registerElement('custom-carousel', CustomCarousel);
})(document);
const productList = document.querySelector('.productWrap');
const productSelect = document.querySelector('.productSelect');
const cartList = document.querySelector('.shoppingCart-tableList');
let productData = [];
let cartData = [];

function init() {
	getProductList();
	getCartList();
}
init();

function getProductList() {
	axios
		.get(
			`${baseUrl}/api/livejs/v1/customer/${api_path}/products`
		)
		.then(function (response) {
			productData = response.data.products;
			renderProductList();
		});
}
function combineProductHTMLItem(item) {
	return `<li class="productCard">
        <h4 class="productType">新品</h4>
        <img
          src="${item.images}"
          alt="">
        <a href="#" class="js-addCart"  id="addCardBtn" data-id="${
					item.id
				}">加入購物車</a>
        <h3>${item.title}</h3>
        <del class="originPrice">NT$${toThousands(item.origin_price)}</del>
        <p class="nowPrice">NT$${toThousands(item.price)}</p>
      </li>`;
}
function renderProductList() {
	let str = '';
	productData.forEach(function (item) {
		str += combineProductHTMLItem(item);
	});
	productList.innerHTML = str;
}
productSelect.addEventListener('change', function (e) {
	const category = e.target.value;
	if (category == '全部') {
		renderProductList();
		return;
	}
	let str = '';
	productData.forEach(function (item) {
		if (item.category == category) {
			str += combineProductHTMLItem(item);
		}
	});
	productList.innerHTML = str;
});

productList.addEventListener('click', function (e) {
	e.preventDefault();
	let addCartClass = e.target.getAttribute('class');
	if (addCartClass !== 'js-addCart') {
		return;
	}
	let productId = e.target.getAttribute('data-id');
	let numCheck = 1;

	cartData.forEach(function (item) {
		if (item.product.id === productId) {
			numCheck = item.quantity += 1;
		}
	});

	axios
		.post(
			`${baseUrl}/api/livejs/v1/customer/${api_path}/carts`,
			{
				'data': {
					'productId': productId,
					'quantity': numCheck,
				},
			}
		)
		.then(function (response) {
			alert('加入購物車');
			getCartList();
		});
});

function getCartList() {
	axios
		.get(
			`${baseUrl}/api/livejs/v1/customer/${api_path}/carts`
		)
		.then(function (response) {
			document.querySelector('.js-total').textContent = toThousands(
				response.data.finalTotal
			);
			cartData = response.data.carts;
			let str = '';
			cartData.forEach(function (item) {
				str += `<tr>
            <td>
              <div class="cardItem-title">
                <img src="${item.product.images}" alt="">
                <p>${item.product.title}</p>
              </div>
            </td>
            <td>NT$${toThousands(item.product.price)}</td>
            <td>${item.quantity}</td>
            <td>NT$${toThousands(item.product.price * item.quantity)}</td>
            <td class="discardBtn">
              <a href="#" class="material-icons" data-id="${item.id}">
                clear
              </a>
            </td>
          </tr>`;
			});

			cartList.innerHTML = str;
		});
}
// 刪除單一品項購物車流程
cartList.addEventListener('click', function (e) {
	e.preventDefault();
	if (!confirm('你是否確定要刪除?')) return;
	const cartId = e.target.getAttribute('data-id');
	if (cartId == null) {
		// alert("你點到其它東西了窩~")
		return;
	}
	// console.log(cartId);
	axios
		.delete(
			`${baseUrl}/api/livejs/v1/customer/${api_path}/carts/${cartId}`
		)
		.then(function (response) {
			alert('刪除單筆購物車成功');
			getCartList();
		});
});
// 刪除全部購物車流程
const discardAllBtn = document.querySelector('.discardAllBtn');
discardAllBtn.addEventListener('click', function (e) {
	e.preventDefault();
	if (!confirm('你是否確定要刪除?')) return;
	axios
		.delete(
			`${baseUrl}/api/livejs/v1/customer/${api_path}/carts`
		)
		.then(function (response) {
			alert('刪除全部購物車成功！');
			getCartList();
		})
		.catch(function (response) {
			alert('購物車已清空，請勿重複點擊');
		});
});

// 送出預訂資料
const inputs = document.querySelectorAll('input,select');
const form = document.querySelector('.orderInfo-form');
const orderInfoBtn = document.querySelector('.orderInfo-btn');
const constraints = {
	姓名: {
		presence: {
			message: '必填欄位',
		},
	},
	電話: {
		presence: {
			message: '必填欄位',
		},
		length: {
			minimum: 8,
			message: '需超過 8 碼',
		},
		format: {
			pattern: '[0-9]+', // 只能填入數字
			flags: 'i', // 大小寫不拘
			message: '請輸入號碼',
		},
	},
	Email: {
		presence: {
			message: '必填欄位',
		},
		email: {
			message: '格式錯誤',
		},
	},
	寄送地址: {
		presence: {
			message: '必填欄位',
		},
	},
	交易方式: {
		presence: {
			message: '必選欄位',
		},
	},
};
orderInfoBtn.addEventListener('click', function (e) {
	e.preventDefault();
	if (cartData.length == 0) {
		alert('請選購商品加入購物車');
		return;
	}
	handleFormSubmit(form);
});
function handleFormSubmit() {
	let errors = validate(form, constraints);
	inputs.forEach((item) => {
		item.addEventListener('change', function () {
			item.nextElementSibling.textContent = '';
		});
	});
	showErrors(form, errors || {});
	if (!errors) {
		showSuccess();
	}
}
function showErrors(form, errors) {
	// console.log(errors);
	Object.keys(errors).forEach(function (keys) {
		console.log(document.querySelector(`[data-message=${keys}]`));
		console.log(errors[keys]);
		document.querySelector(`[data-message="${keys}"]`).textContent =
			errors[keys];
	});
}
function showSuccess() {
	const customerName = document.querySelector('#customerName').value;
	const customerPhone = document.querySelector('#customerPhone').value;
	const customerEmail = document.querySelector('#customerEmail').value;
	const customerAddress = document.querySelector('#customerAddress').value;
	const customerTradeWay = document.querySelector('#tradeWay').value;
	axios
		.post(
			`${baseUrl}/api/livejs/v1/customer/${api_path}/orders`,
			{
				'data': {
					'user': {
						'name': customerName,
						'tel': customerPhone,
						'email': customerEmail,
						'address': customerAddress,
						'payment': customerTradeWay,
					},
				},
			}
		)
		.then(function (response) {
			alert('訂單建立成功');
			form.reset();
			getCartList();
		});
}
// 數字千分位標註
function toThousands(x) {
	let parts = x.toString().split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return parts.join('.');
}

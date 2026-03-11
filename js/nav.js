
let currentCategory = 'all';
let isFirstRender = true;

// 获取首字母
function getIcon(name) {
	return name.charAt(0).toUpperCase();
}

// 获取域名
function getDomain(url) {
	try {
		if (url.startsWith('http')) {
			return new URL(url).hostname.replace('www.', '');
		}
		return url;
	} catch {
		return url;
	}
}

// 处理 Bing 搜索
function handleBingSearch(form) {
	const query = document.getElementById('searchInput').value.trim();
	if (!query) {
		return false; // 空搜索不提交
	}
	// 允许表单正常提交到 Bing
	return true;
}

// 渲染分类标签
function renderFilterTags() {
	const container = document.getElementById('filterTags');
	navdata.forEach(item => {
		const tag = document.createElement('div');
		tag.className = 'tag';
		tag.textContent = item.category;
		tag.dataset.category = item.category;
		container.appendChild(tag);
	});
}

// 渲染网站卡片 - 修复抖动问题
function renderSites(data, filterCategory = 'all', searchTerm = '') {
	const mainContent = document.getElementById('mainContent');
	const emptyState = document.getElementById('emptyState');
	
	// 使用 requestAnimationFrame 避免布局抖动
	requestAnimationFrame(() => {
		mainContent.innerHTML = '';
		
		let hasResults = false;
		let sectionIndex = 0;

		data.forEach((category) => {
			// 分类筛选
			if (filterCategory !== 'all' && category.category !== filterCategory) {
				return;
			}

			// 搜索筛选
			const filteredSites = category.websites.filter(site => 
				site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				site.url.toLowerCase().includes(searchTerm.toLowerCase())
			);

			if (filteredSites.length === 0) return;
			hasResults = true;

			// 创建分类区块
			const section = document.createElement('section');
			section.className = 'category-section';
			
			// 只有首次加载使用动画，筛选时不使用动画避免抖动
			if (!isFirstRender) {
				section.classList.add('no-animate');
			} else {
				section.style.animationDelay = `${sectionIndex * 0.05}s`;
			}

			const header = document.createElement('div');
			header.className = 'category-header';
			header.innerHTML = `
				<h2 class="category-title">${category.category}</h2>
				<span class="category-count">${filteredSites.length} 个网站</span>
			`;

			const grid = document.createElement('div');
			grid.className = 'sites-grid';

			filteredSites.forEach(site => {
				const card = document.createElement('a');
				card.className = 'site-card';
				card.href = site.url;
				card.target = '_blank';
				card.rel = 'noopener noreferrer';
				card.innerHTML = `
					<div class="site-icon">${getIcon(site.name)}</div>
					<div class="site-name">${site.name}</div>
					<div class="site-url">${getDomain(site.url)}</div>
				`;
				grid.appendChild(card);
			});

			section.appendChild(header);
			section.appendChild(grid);
			mainContent.appendChild(section);
			
			sectionIndex++;
		});

		// 显示/隐藏空状态
		if (!hasResults) {
			emptyState.classList.add('show');
		} else {
			emptyState.classList.remove('show');
		}

		// 标记首次渲染完成
		if (isFirstRender) {
			setTimeout(() => {
				isFirstRender = false;
			}, 500);
		}
	});
}

// 初始化
function init() {
	renderFilterTags();
	
	// 模拟加载
	setTimeout(() => {
		renderSites(navdata);
	}, 300);

	// 标签点击事件 - 使用事件委托
	document.getElementById('filterTags').addEventListener('click', (e) => {
		if (e.target.classList.contains('tag')) {
			// 更新激活状态
			document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
			e.target.classList.add('active');
			
			// 更新当前分类并重新渲染
			currentCategory = e.target.dataset.category;
			const searchTerm = document.getElementById('searchInput').value;
			renderSites(navdata, currentCategory, searchTerm);
		}
	});

	// 搜索输入事件 - 本地筛选
	let searchTimeout;
	document.getElementById('searchInput').addEventListener('input', (e) => {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			const searchTerm = e.target.value;
			// 如果输入内容，自动切换到"全部"以搜索所有分类
			if (searchTerm && currentCategory !== 'all') {
				document.querySelectorAll('.tag').forEach(t => {
					t.classList.remove('active');
					if (t.dataset.category === 'all') t.classList.add('active');
				});
				currentCategory = 'all';
			}
			renderSites(navdata, currentCategory, searchTerm);
		}, 150); // 防抖，减少重绘
	});

	// 处理回车键 - 如果输入内容则进行 Bing 搜索
	document.getElementById('searchInput').addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			const value = e.target.value.trim();
			if (value) {
				// 如果有输入内容，提交 Bing 搜索
				e.target.form.submit();
			}
		}
	});
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
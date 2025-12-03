/**
 * CRM IQ Components Loader - Standalone Version
 * Components embedded directly (no fetch required)
 * Works on GitHub Pages and local file:// protocol
 */

const CRMComponents = {
    // Embedded component templates
    templates: {
        'app-header': `<!-- App Header Component -->
<header class="header">
    <div class="header-content">
        <div class="left-section">
            <img src="../images/crm-iq-logo.png" alt="CRM IQ" class="logo">
            <nav class="nav-menu">
                <div class="nav-item">
                    <span>Dashboards</span>
                    <i class="fas fa-caret-down"></i>
                </div>
                <div class="nav-item">
                    <span>Reports</span>
                    <i class="fas fa-caret-down"></i>
                </div>
                <div class="nav-item">
                    <span>Communications</span>
                    <i class="fas fa-caret-down"></i>
                </div>
                <button class="nav-grid-btn">
                    <i class="fas fa-th"></i>
                </button>
            </nav>
            <div class="left-actions">
                <div class="search-section">
                    <div class="search-container">
                        <input type="text" class="search-input" placeholder="Search...">
                        <button class="search-btn">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <button class="add-new-btn">
                    <span>Add New</span>
                    <i class="fas fa-caret-down"></i>
                </button>
                <button class="action-btn calendar-btn">
                    <i class="fas fa-calendar-alt"></i>
                </button>
                <button class="action-btn calculator-btn">
                    <i class="fas fa-calculator"></i>
                </button>
            </div>
        </div>
        
        <div class="header-actions">
            <button class="action-btn star-btn">
                <i class="fas fa-star" style="font-size: 18px;"></i>
            </button>
            <button class="action-btn help-btn">
                <i class="fas fa-question-circle" style="font-size: 18px;"></i>
            </button>
            <button class="action-btn notification-btn">
                <i class="fas fa-bell" style="font-size: 18px;"></i>
            </button>
            <button class="action-btn settings-btn">
                <i class="fas fa-cog" style="font-size: 18px;"></i>
            </button>
            <div class="user-profile">
                <div class="user-avatar">ND</div>
            </div>
        </div>
    </div>
</header>`,

        'breadcrumb': `<!-- Breadcrumb Component -->
<div class="breadcrumb">
    <div class="breadcrumb-content" id="breadcrumb-content">
        <!-- Breadcrumb will be dynamically populated -->
    </div>
    <i class="fas fa-info-circle info-icon"></i>
</div>`,

        'page-header': `<!-- Page Header Component -->
<div class="page-header">
    <div class="title-section" id="page-header-title">
        <h1 class="page-title mr-0">Page Title</h1>
    </div>
    
    <div class="flex items-center gap-3" id="page-header-actions">
        <!-- Actions will be dynamically populated -->
    </div>
</div>`,

        'tabs': `<!-- Tabs Component -->
<div class="tabs-container">
    <div class="tabs" id="tabs-content">
        <!-- Tabs will be dynamically populated -->
    </div>
</div>`,

        'pageslide': `<!-- Pageslide Component -->
<!-- Usage: Add data-pageslide-size attribute with values: sm, md, lg, xl, full -->
<div class="pageslide-overlay" id="pageslide-overlay">
    <div class="pageslide" id="pageslide" data-pageslide-size="md">
        <!-- Header -->
        <div class="pageslide-header">
            <h2 class="pageslide-title" id="pageslide-title">Pageslide Title</h2>
            <button class="pageslide-close" id="pageslide-close" onclick="closePageslide()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <!-- Body -->
        <div class="pageslide-body" id="pageslide-body">
            <!-- Content will be dynamically populated -->
        </div>
        
        <!-- Footer -->
        <div class="pageslide-footer" id="pageslide-footer">
            <button class="btn btn-light" onclick="closePageslide()">Cancel</button>
            <button class="btn btn-primary">Save Changes</button>
        </div>
    </div>
</div>

<script>
function openPageslide(options = {}) {
    const overlay = document.getElementById('pageslide-overlay');
    const pageslide = document.getElementById('pageslide');
    const title = document.getElementById('pageslide-title');
    const body = document.getElementById('pageslide-body');
    const footer = document.getElementById('pageslide-footer');
    
    // Set title
    if (options.title) {
        title.textContent = options.title;
    }
    
    // Set body content
    if (options.content) {
        body.innerHTML = options.content;
    }
    
    // Set footer content
    if (options.footer) {
        footer.innerHTML = options.footer;
    }
    
    // Set size
    if (options.size) {
        pageslide.setAttribute('data-pageslide-size', options.size);
    }
    
    // Show pageslide
    overlay.classList.add('active');
    setTimeout(() => {
        pageslide.classList.add('active');
    }, 10);
}

function closePageslide() {
    const overlay = document.getElementById('pageslide-overlay');
    const pageslide = document.getElementById('pageslide');
    
    pageslide.classList.remove('active');
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 300);
}

// Close on overlay click
document.getElementById('pageslide-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closePageslide();
    }
});

// Close on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePageslide();
    }
});
</script>`,

        'data-table': `<!-- Data Table Component -->
<div class="data-table-wrapper">
    <!-- Table Header -->
    <div class="data-table-header">
        <div class="data-table-header-left">
            <div class="search-container-table">
                <i class="fas fa-search search-icon-table"></i>
                <input type="text" class="search-input-table" placeholder="Search">
            </div>
            
            <!-- Bulk Actions (hidden by default, shown when items selected) -->
            <div class="bulk-actions-inline" id="bulk-actions-bar" style="display: none;">
                <div class="bulk-actions-buttons" id="bulk-actions-buttons">
                    <!-- Bulk action buttons will be populated here -->
                </div>
            </div>
            
            <div class="table-badge-container" id="table-badge">
                <span class="table-badge">0</span>
                <span class="table-badge-label">Items</span>
            </div>
        </div>
        <div class="data-table-header-right" id="header-actions-container">
            <!-- Header actions will be populated here if enabled -->
        </div>
    </div>

    <!-- Table Container -->
    <div class="data-table-container">
        <!-- Bulk Selected Overlay -->
        <div class="bulk-selected-overlay" id="bulk-selected-overlay" style="display: none;">
            <span class="bulk-selected-count" id="bulk-selected-count">0 items selected</span>
        </div>
        
        <table class="data-table" id="data-table">
            <thead>
                <tr id="table-header-row">
                    <!-- Headers will be dynamically populated -->
                </tr>
            </thead>
            <tbody id="table-body">
                <!-- Rows will be dynamically populated -->
            </tbody>
        </table>
    </div>
</div>`
    },

    /**
     * Load a component from embedded templates
     */
    loadComponent(componentName) {
        return this.templates[componentName] || null;
    },

    /**
     * Initialize the app header component
     */
    initAppHeader(containerId = 'app-header-container') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.loadComponent('app-header');
        if (html) {
            container.innerHTML = html;
        }
    },

    /**
     * Initialize the breadcrumb component
     * @param {string} containerId - Container element ID
     * @param {string} breadcrumbData - Pipe-separated breadcrumb items
     */
    initBreadcrumb(containerId = 'breadcrumb-container', breadcrumbData = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.loadComponent('breadcrumb');
        if (html) {
            container.innerHTML = html;

            // Parse breadcrumb data
            const data = breadcrumbData || container.dataset.breadcrumb || '';
            if (data) {
                const items = data.split('|');
                this.renderBreadcrumb(items);
            }
        }
    },

    /**
     * Render breadcrumb items
     */
    renderBreadcrumb(items) {
        const content = document.getElementById('breadcrumb-content');
        if (!content) return;

        const html = items.map((item, index) => {
            const isLast = index === items.length - 1;
            if (isLast) {
                return item;
            } else {
                return `<a href="#">${item}</a> <span class="breadcrumb-separator">/</span> `;
            }
        }).join('');

        content.innerHTML = html;
    },

    /**
     * Initialize the page header component
     * @param {Object} config - Configuration object
     */
    initPageHeader(config = {}) {
        const {
            containerId = 'page-header-container',
            title = 'Page Title',
            subtitle = null,
            badges = [],
            actionsHtml = '',
            hasBreadcrumb = false
        } = config;

        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.loadComponent('page-header');
        if (html) {
            container.innerHTML = html;

            // Add positioning class
            const pageHeader = container.querySelector('.page-header');
            if (pageHeader) {
                pageHeader.classList.add(hasBreadcrumb ? 'with-breadcrumb' : 'no-breadcrumb');
            }

            // Set title
            const titleSection = document.getElementById('page-header-title');
            if (titleSection) {
                let titleHtml = `<h1 class="page-title mr-0">${title}</h1>`;
                
                if (badges.length > 0) {
                    const badgesHtml = badges.map(badge => 
                        `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-${badge.color}-100 text-${badge.color}-800">${badge.text}</span>`
                    ).join('');
                    titleHtml = `
                        <div class="title-with-badges">
                            <h1 class="page-title mr-0">${title}</h1>
                            <div class="badges-container">${badgesHtml}</div>
                        </div>
                    `;
                }

                if (subtitle) {
                    titleHtml += `<div class="flex items-center gap-2 text-muted text-sm">${subtitle}</div>`;
                }

                titleSection.innerHTML = titleHtml;
            }

            // Set actions
            const actionsSection = document.getElementById('page-header-actions');
            if (actionsSection && actionsHtml) {
                actionsSection.innerHTML = actionsHtml;
            }
        }
    },

    /**
     * Initialize the tabs component
     * @param {Object} config - Configuration object
     */
    initTabs(config = {}) {
        const {
            containerId = 'tabs-container',
            tabs = [],
            activeIndex = 0,
            hasBreadcrumb = false,
            onChange = null
        } = config;

        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.loadComponent('tabs');
        if (html) {
            container.innerHTML = html;

            // Add positioning class
            const tabsContainer = container.querySelector('.tabs-container');
            if (tabsContainer) {
                tabsContainer.classList.add(hasBreadcrumb ? 'sticky-with-breadcrumb' : 'sticky-no-breadcrumb');
            }

            // Parse tabs from data attribute if not provided
            const tabData = tabs.length > 0 ? tabs : (container.dataset.tabs || '').split('|').filter(t => t);

            // Render tabs
            this.renderTabs(tabData, activeIndex, onChange);
        }
    },

    /**
     * Render tab buttons
     */
    renderTabs(tabs, activeIndex, onChange) {
        const content = document.getElementById('tabs-content');
        if (!content) return;

        const html = tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return `<button class="tab ${isActive ? 'active' : ''}" data-tab-index="${index}">${tab}</button>`;
        }).join('');

        content.innerHTML = html;

        // Add click handlers
        content.querySelectorAll('.tab').forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs
                content.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Call onChange callback if provided
                if (onChange && typeof onChange === 'function') {
                    onChange(index, tabs[index]);
                }
            });
        });
    },

    /**
     * Initialize the pageslide component
     * @param {string} containerId - The ID of the container to load the pageslide into
     */
    initPageslide(containerId = 'pageslide-container') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container with id "${containerId}" not found.`);
            return;
        }

        const html = this.loadComponent('pageslide');
        if (html) {
            // Extract just the HTML part (without script tags)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Remove script tags and get just the HTML
            const scripts = tempDiv.querySelectorAll('script');
            scripts.forEach(script => script.remove());
            
            container.innerHTML = tempDiv.innerHTML;
            
            // Now define the pageslide functions globally
            this.definePageslideFunctions();
        }
    },

    /**
     * Define pageslide control functions globally
     */
    definePageslideFunctions() {
        // Define openPageslide globally
        window.openPageslide = function(options = {}) {
            const overlay = document.getElementById('pageslide-overlay');
            const pageslide = document.getElementById('pageslide');
            const title = document.getElementById('pageslide-title');
            const body = document.getElementById('pageslide-body');
            const footer = document.getElementById('pageslide-footer');
            
            if (!overlay || !pageslide) return;
            
            // Set title
            if (options.title) {
                title.textContent = options.title;
            }
            
            // Set body content
            if (options.content) {
                body.innerHTML = options.content;
            }
            
            // Set footer content
            if (options.footer !== undefined) {
                footer.innerHTML = options.footer;
            }
            
            // Set size
            if (options.size) {
                pageslide.setAttribute('data-pageslide-size', options.size);
            }
            
            // Disable body scroll
            document.body.style.overflow = 'hidden';
            
            // Show pageslide
            overlay.classList.add('active');
            setTimeout(() => {
                pageslide.classList.add('active');
            }, 10);
        };

        // Define closePageslide globally
        window.closePageslide = function() {
            const overlay = document.getElementById('pageslide-overlay');
            const pageslide = document.getElementById('pageslide');
            
            if (!overlay || !pageslide) return;
            
            pageslide.classList.remove('active');
            setTimeout(() => {
                overlay.classList.remove('active');
                // Re-enable body scroll
                document.body.style.overflow = '';
            }, 300);
        };

        // Close on overlay click
        const overlay = document.getElementById('pageslide-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    window.closePageslide();
                }
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const overlay = document.getElementById('pageslide-overlay');
                if (overlay && overlay.classList.contains('active')) {
                    window.closePageslide();
                }
            }
        });
    },

    /**
     * Initialize the data table component
     * @param {Object} config - Configuration object
     */
    initDataTable(config = {}) {
        const {
            containerId = 'data-table-container',
            columns = [],
            data = [],
            badgeLabel = 'Items',
            headerActions = [],
            bulkActions = [],
            onRowClick = null,
            onActionClick = null
        } = config;

        const container = document.getElementById(containerId);
        if (!container) return;

        const html = this.loadComponent('data-table');
        if (html) {
            container.innerHTML = html;

            // Update badge count and label
            const badge = container.querySelector('.table-badge');
            const badgeText = container.querySelector('.table-badge-label');
            if (badge) badge.textContent = data.length;
            if (badgeText) badgeText.textContent = badgeLabel;

            // Add header actions if provided
            if (headerActions.length > 0) {
                const headerActionsContainer = container.querySelector('#header-actions-container');
                const headerActionsHtml = headerActions.map(action => 
                    `<button class="btn btn-light" data-action="${action.id}">
                        ${action.icon ? `<i class="${action.icon}"></i>` : ''}
                        <span>${action.label}</span>
                    </button>`
                ).join('');
                headerActionsContainer.innerHTML = headerActionsHtml;

                // Add click handlers for header actions
                headerActionsContainer.querySelectorAll('.btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const actionId = btn.dataset.action;
                        const action = headerActions.find(a => a.id === actionId);
                        if (action && action.onClick) {
                            action.onClick();
                        }
                    });
                });
            }

            // Setup bulk actions if provided
            if (bulkActions.length > 0) {
                const bulkActionsButtons = container.querySelector('#bulk-actions-buttons');
                const bulkActionsHtml = bulkActions.map(action => {
                    let className = 'btn btn-light';
                    if (action.type === 'primary') {
                        className = 'btn btn-primary';
                    } else if (action.type === 'light-danger') {
                        className = 'btn btn-light text-danger';
                    }
                    return `<button class="${className}" data-action="${action.id}">
                        ${action.icon ? `<i class="${action.icon}"></i>` : ''}
                        <span>${action.label}</span>
                    </button>`;
                }).join('');
                bulkActionsButtons.innerHTML = bulkActionsHtml;

                // Add click handlers for bulk actions
                bulkActionsButtons.querySelectorAll('.btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const actionId = btn.dataset.action;
                        const action = bulkActions.find(a => a.id === actionId);
                        if (action && action.onClick) {
                            const selectedRows = this.getSelectedRows(container);
                            const selectedData = selectedRows.map(index => data[index]);
                            action.onClick(selectedData, selectedRows);
                        }
                    });
                });
            }

            // Render table headers
            this.renderTableHeaders(container, columns, bulkActions.length > 0);

            // Render table rows
            this.renderTableRows(container, columns, data, onRowClick, onActionClick, bulkActions.length > 0);

            // Add search functionality
            this.initTableSearch(container, columns, data, onRowClick, onActionClick, bulkActions.length > 0);
        }
    },

    /**
     * Render table headers
     */
    renderTableHeaders(container, columns, hasBulkActions = false) {
        const headerRow = container.querySelector('#table-header-row');
        if (!headerRow) return;

        const headersHtml = columns.map(col => {
            if (col.type === 'checkbox') {
                return `<th class="checkbox-col"><input type="checkbox" class="table-checkbox" id="select-all-checkbox"></th>`;
            } else if (col.type === 'actions') {
                return `<th class="actions-col">${col.label || 'Actions'}</th>`;
            } else {
                return `<th class="${col.sortable !== false ? 'sortable' : ''}" data-column="${col.key}">${col.label}</th>`;
            }
        }).join('');

        headerRow.innerHTML = headersHtml;

        // Add select all functionality
        const selectAllCheckbox = container.querySelector('#select-all-checkbox');
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                const checkboxes = container.querySelectorAll('.row-checkbox');
                checkboxes.forEach(cb => cb.checked = e.target.checked);
                if (hasBulkActions) {
                    this.updateBulkActionsBar(container);
                }
            });
        }
    },

    /**
     * Render table rows
     */
    renderTableRows(container, columns, data, onRowClick, onActionClick, hasBulkActions = false) {
        const tbody = container.querySelector('#table-body');
        if (!tbody) return;

        const rowsHtml = data.map((row, rowIndex) => {
            const cells = columns.map(col => {
                if (col.type === 'checkbox') {
                    return `<td class="checkbox-col"><input type="checkbox" class="table-checkbox row-checkbox" data-row-index="${rowIndex}"></td>`;
                } else if (col.type === 'actions') {
                    return `<td class="actions-col"><button class="actions-menu-btn" data-row-index="${rowIndex}"><i class="fas fa-ellipsis-v"></i></button></td>`;
                } else {
                    return `<td>${col.render ? col.render(row[col.key], row) : row[col.key] || ''}</td>`;
                }
            }).join('');
            
            return `<tr data-row-index="${rowIndex}">${cells}</tr>`;
        }).join('');

        tbody.innerHTML = rowsHtml;

        // Add checkbox change handlers for bulk actions
        if (hasBulkActions) {
            tbody.querySelectorAll('.row-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    this.updateBulkActionsBar(container);
                    
                    // Update select all checkbox state
                    const selectAllCheckbox = container.querySelector('#select-all-checkbox');
                    const allCheckboxes = container.querySelectorAll('.row-checkbox');
                    const checkedCheckboxes = container.querySelectorAll('.row-checkbox:checked');
                    if (selectAllCheckbox) {
                        selectAllCheckbox.checked = allCheckboxes.length === checkedCheckboxes.length && allCheckboxes.length > 0;
                    }
                });
            });
        }

        // Add row click handlers
        if (onRowClick) {
            tbody.querySelectorAll('tr').forEach(tr => {
                tr.addEventListener('click', (e) => {
                    if (!e.target.closest('.table-checkbox') && !e.target.closest('.actions-menu-btn')) {
                        const rowIndex = parseInt(tr.dataset.rowIndex);
                        onRowClick(data[rowIndex], rowIndex);
                    }
                });
            });
        }

        // Add action button handlers
        if (onActionClick) {
            tbody.querySelectorAll('.actions-menu-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const rowIndex = parseInt(btn.dataset.rowIndex);
                    onActionClick(data[rowIndex], rowIndex, btn);
                });
            });
        }
    },

    /**
     * Initialize table search
     */
    initTableSearch(container, columns, data, onRowClick, onActionClick, hasBulkActions = false) {
        const searchInput = container.querySelector('.search-input-table');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredData = data.filter(row => {
                return columns.some(col => {
                    if (col.type === 'checkbox' || col.type === 'actions') return false;
                    const value = row[col.key];
                    return value && value.toString().toLowerCase().includes(searchTerm);
                });
            });

            // Update badge count
            const badge = container.querySelector('.table-badge');
            if (badge) badge.textContent = filteredData.length;

            // Re-render rows
            this.renderTableRows(container, columns, filteredData, onRowClick, onActionClick, hasBulkActions);
            
            // Hide bulk actions bar when searching
            if (hasBulkActions) {
                this.updateBulkActionsBar(container);
            }
        });
    },

    /**
     * Update bulk actions bar visibility and count
     */
    updateBulkActionsBar(container) {
        const bulkActionsBar = container.querySelector('#bulk-actions-bar');
        const bulkSelectedOverlay = container.querySelector('#bulk-selected-overlay');
        const bulkSelectedCount = container.querySelector('#bulk-selected-count');
        const tableBadge = container.querySelector('.table-badge-container');
        const secondColumnHeader = container.querySelector('.data-table thead th:nth-child(2)');
        const selectedCheckboxes = container.querySelectorAll('.row-checkbox:checked');
        const count = selectedCheckboxes.length;

        if (count > 0) {
            bulkActionsBar.style.display = 'flex';
            if (bulkSelectedOverlay) bulkSelectedOverlay.style.display = 'block';
            bulkSelectedCount.textContent = `${count} item${count !== 1 ? 's' : ''} selected`;
            if (tableBadge) tableBadge.style.display = 'none';
            if (secondColumnHeader) secondColumnHeader.classList.add('bulk-selection-active');
        } else {
            bulkActionsBar.style.display = 'none';
            if (bulkSelectedOverlay) bulkSelectedOverlay.style.display = 'none';
            if (tableBadge) tableBadge.style.display = 'flex';
            if (secondColumnHeader) secondColumnHeader.classList.remove('bulk-selection-active');
        }
    },

    /**
     * Get selected rows
     */
    getSelectedRows(container) {
        const checkboxes = container.querySelectorAll('.row-checkbox:checked');
        return Array.from(checkboxes).map(cb => parseInt(cb.dataset.rowIndex));
    },

    /**
     * Initialize all components on the page
     * @param {Object} config - Configuration for all components
     */
    initAll(config = {}) {
        const {
            appHeader = true,
            breadcrumb = null,
            pageHeader = null,
            tabs = null,
            pageslide = false
        } = config;

        // Load components in order
        if (appHeader) {
            this.initAppHeader();
        }

        if (breadcrumb) {
            this.initBreadcrumb(breadcrumb.containerId, breadcrumb.data);
        }

        if (pageHeader) {
            this.initPageHeader(pageHeader);
        }

        if (tabs) {
            this.initTabs(tabs);
        }

        if (pageslide) {
            this.initPageslide(pageslide.containerId || 'pageslide-container');
        }
    }
};

// Make available globally
window.CRMComponents = CRMComponents;


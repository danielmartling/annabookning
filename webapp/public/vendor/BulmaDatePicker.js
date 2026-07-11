class BulmaDatePicker {
    constructor(container, options = {}) {
        this.container = container;
        this.options = Object.assign({
            range: false,
            alwaysOpen: false,
            static: false,
            rangeArrow: true,
            inputWidth: 160,
        }, options);

        this.currentMonth = new Date();
        this.range = [null, null];
        this.activeField = null;

        this._renderInputs();
        this._renderDropdown();
        this._bindEvents();
        this._renderCalendar();
    }

    getValue() {
        return this.options.range
            ? [this.startInput.value, this.endInput.value]
            : this.startInput.value;
    }

    setValue(value) {
        if (this.options.range) {
            if (Array.isArray(value) && value.length === 2) {
                this.startInput.value = value[0] || '';
                this.endInput.value = value[1] || '';
                this.range[0] = value[0] || null;
                this.range[1] = value[1] || null;
            }
        } else {
            if (typeof value === 'string') {
                this.startInput.value = value;
                this.range[0] = value;
            }
        }
        this._renderCalendar();
        this._triggerSelect();
    }

    clear() {
        this.startInput.value = '';
        if (this.options.range) {
            this.endInput.value = '';
            this.range = [null, null];
        } else {
            this.range[0] = null;
        }
        this._renderCalendar();
        this._triggerSelect();
    }

    activate() {
        this.options.static = false;
        this._renderInputs();
        this._renderDropdown();
        this._bindEvents();
        this._renderCalendar();
    }

    deactivate() {
        this.options.static = true;
        this._renderInputs();
        this._renderDropdown();
        this._bindEvents();
        this._renderCalendar();
    }

    _triggerSelect() {
        const event = new CustomEvent("select", {
            detail: { value: this.getValue() }
        });
        this.container.dispatchEvent(event);
    }

    _renderInputs() {
        this.container.innerHTML = '';

        let field = document.createElement('div');
        field.className = this.options.range ? 'field has-addons' : 'field';


        let startControl = document.createElement("div");
        startControl.className = "control has-icons-right";
        startControl.style.width = `${this.options.inputWidth}px`;
        startControl.innerHTML = `
            <input class="input start-date calendar-toggle" type="text" placeholder="YYYY-MM-DD" ${this.options.static ? "readonly" : ""}>
            <span class="icon is-right is-clickable calendar-toggle">
                <span class="iconify" data-icon="${this.options.range ? 'mdi-calendar-range' : 'mdi-calendar'}"></span>
            </span>
        `;
        if (this.options.alwaysOpen) {
            startControl.style.display = "none"
        }
        field.appendChild(startControl);

        if (this.options.range) {

            if (this.options.rangeArrow) {
                let arrow = document.createElement("div");
                arrow.classList = "control is-static";
                arrow.innerHTML = `
                <span class="icon is-clickable calendar-toggle">
                    <span class="iconify" data-icon="mdi-arrow-right"></span>
                </span>
            `;
                if (this.options.alwaysOpen) {
                    arrow.style.display = "none"
                }
                field.appendChild(arrow);
            }

            let endControl = document.createElement("div");
            endControl.className = "control has-icons-right";
            endControl.style.width = `${this.options.inputWidth}px`;
            endControl.innerHTML = `
            <input class="input end-date calendar-toggle" type="text" placeholder="YYYY-MM-DD" ${this.options.static ? "readonly" : ""}>
            <span class="icon is-right is-clickable calendar-toggle">
                <span class="iconify" data-icon="mdi-calendar-range"></span>
            </span>
        `;
            if (this.options.alwaysOpen) {
                endControl.style.display = "none"
            }
            field.appendChild(endControl);
        }

        this.container.appendChild(field);

        this.startInput = this.container.querySelector('.start-date');
        this.endInput = this.container.querySelector('.end-date');
    }

    _renderDropdown() {
        this.dropdown = document.createElement("div");
        this.dropdown.className = "datepicker-dropdown";
        if (this.options.alwaysOpen) {
            this.dropdown.classList.add("is-active", "is-static");
        }
        this.container.appendChild(this.dropdown);
    }

    _bindEvents() {
        if (this.options.alwaysOpen || this.options.static) {
            return;
        }

        // Click on a toggle to open dropdown
        const toggles = this.container.querySelectorAll('.calendar-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener("click", (e) => {
                e.stopPropagation();
                this.activeField = e.target.closest('.control').querySelector('input');
                this.dropdown.classList.add('is-active');
                this._renderCalendar();
            });
        });

        // Upon change to input, update value
        this.startInput.addEventListener("change", () => {
            this.range[0] = this.startInput.value || null;
            this._renderCalendar();
        });

        if (this.options.range && this.endInput) {
            this.endInput.addEventListener("change", () => {
                this.range[1] = this.endInput.value || null;
                this._renderCalendar();
            });
        }

        // Click anywhere outside dropdown to close it
        document.addEventListener("click", (e) => {
            if (!this.container.contains(e.target)) {
                this.dropdown.classList.remove("is-active");
            }
        });
    }

    _renderCalendar() {
        this.dropdown.innerHTML = '';

        let calendar = document.createElement("div");
        calendar.className = 'box';

        let header = document.createElement("div");
        header.className = 'notification';
        header.innerHTML = `
            <nav class="level is-mobile">
                <div class="level-left">
                    <div class="level-item">
                        <button class="button is-small prev-year"><span class="iconify" data-icon="mdi-chevron-double-left"></span></button>
                        <button class="button is-small prev-month"><span class="iconify" data-icon="mdi-chevron-left"></span></button>
                    </div>
                </div>

                <div class="level-item has-text-weight-bold" style="min-width: 150px;">
                    ${this.currentMonth.toLocaleString('default', { month: 'long' })} ${this.currentMonth.getFullYear()}
                </div>

                <div class="level-right">
                    <div class="level-item">
                        <button class="button is-small next-month"><span class="iconify" data-icon="mdi-chevron-right"></span></button>
                        <button class="button is-small next-year"><span class="iconify" data-icon="mdi-chevron-double-right"></span></button>
                    </div>
                </div>
            </nav>
        `;
        calendar.appendChild(header);

        let daysGrid = document.createElement("div")
        daysGrid.className = "datepicker-grid";

        ["M", "T", "W", "T", "F", "S", "S"].forEach(day => {
            let column = document.createElement("div");
            column.className = "day-label has-text-weight-bold";
            column.textContent = day;
            daysGrid.appendChild(column)
        });

        let firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
        let lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

        let weekday = (firstDay.getDay() + 6) % 7;
        for (let i = 0; i < weekday; i++) {
            let empty = document.createElement("div");
            empty.className = "date-cell empty";
            daysGrid.appendChild(empty);
        }

        for (let d = 1; d <= lastDay.getDate(); d++) {
            let column = document.createElement('div');
            column.className = 'date-cell';
            let dateObj = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), d);
            column.textContent = d;
            let dateStr = toString(dateObj);

            column.addEventListener('click', (e) => {
                if (this.options.static) {
                    return;
                }
                e.stopPropagation();
                if (this.options.range) {
                    if (!this.range[0]) {
                        this.activeField = this.startInput;
                    } else if (this.range[0] && this.range[1]) {
                        this.activeField = this.startInput;
                        this.clear();
                    }
                    if (this.activeField === this.startInput) {
                        this.range[0] = dateStr;
                        this.startInput.value = dateStr;
                        this.activeField = this.endInput;
                    } else if (this.activeField === this.endInput) {
                        if (this.startInput.value <= dateStr) {
                            this.range[1] = dateStr;
                            this.endInput.value = dateStr;
                        } else {
                            this.range[1] = this.range[0];
                            this.endInput.value = this.startInput.value;
                            this.range[0] = dateStr
                            this.startInput.value = dateStr;
                        }
                        this.dropdown.classList.remove('is-active');
                    }
                } else {
                    this.range[0] = dateStr;
                    this.startInput.value = dateStr;
                    this.dropdown.classList.remove('is-active');
                }
                this._renderCalendar();
                this._triggerSelect();
            });

            // Highlight selected range
            if (this.range[0] && !this.range[1]) {
                const date = toDate(dateStr).getTime();
                const start = toDate(this.range[0]).getTime();
                if (date === start) {
                    column.classList.add("is-range-one-day");
                }
            } else if (this.range[0] && this.range[1]) {
                const date = toDate(dateStr).getTime();
                const start = toDate(this.range[0]).getTime();
                const end = toDate(this.range[1]).getTime();

                if (date === start && date === end) {
                    column.classList.add("is-range-one-day");
                } else {
                    if (date === start) {
                        column.classList.add("is-range-start");
                    } else if (date > start && date < end) {
                        column.classList.add("is-range-middle");
                    } else if (date === end) {
                        column.classList.add("is-range-end");
                    }
                }
            }

            daysGrid.appendChild(column);
        }

        calendar.appendChild(daysGrid);
        this.dropdown.appendChild(calendar);

        // Navigation
        header.querySelector('.prev-month').onclick = (e) => {
            e.stopPropagation();
            this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
            this._renderCalendar();
        };
        header.querySelector('.next-month').onclick = (e) => {
            e.stopPropagation();
            this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
            this._renderCalendar();
        };
        header.querySelector('.prev-year').onclick = (e) => {
            e.stopPropagation();
            this.currentMonth.setFullYear(this.currentMonth.getFullYear() - 1);
            this._renderCalendar();
        };
        header.querySelector('.next-year').onclick = (e) => {
            e.stopPropagation();
            this.currentMonth.setFullYear(this.currentMonth.getFullYear() + 1);
            this._renderCalendar();
        };
    }
}

function toString(date) {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function toDate(dateStr) {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
}

export default BulmaDatePicker;
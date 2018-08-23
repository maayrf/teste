# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.12.0 - 2018-08-01

### Changed

* ✅ User and token PropTypes at:
  * ✅ Dashboard Container
  * ✅ Alert Notification Container

### Fixed

* ✅ Using token from logged user to load dashboard in real time

## 0.11.0 - 2018-07-31

### Changed

* ✅ Erase words `Potência` e `Porcentagem` in the headers of Tables in Productive Hours, Rush Hours and Apportionment page
* ✅ At Performance Index Chart:
  * ✅ Keep only values on the y-axis
  * ✅ All units of measurement should be used from the return of backend
  * ✅ Add reference parameter returned from backend above the chart
* ✅ Power Demand Chart
  * ✅ remove y-axis on right side
* ✅ Prevent `Bandeira Amarela`, `Bandeira Verde`, `Bandeira Vermelha P1` and `Bandeira Vermelha P2` labels from exceeding the layout width limits on the dashboard

### Fixed

* ✅ Using token from logged user to load alert notifications in real time
* ✅ Dropdown "Marcar" returns empty list options at emitted alerts tab
* ✅ Can not select meters at Apportionments Page
* ✅ Consumption Page breaks

## 0.10.0 - 2018-07-27

### Changed

* ✅ Dashboard design and layout reviewed
  * ✅ Pattern in cards titles (uppercase and using same color)
  * ✅ New Icons used with DashBoard Indicator
    * ✅ Battery Icon
    * ✅ Carbonic Gas Icon
    * ✅ Power Demand Icon
    * ✅ Meter Wifi Icon (used to show the active meters)
    * ✅ More Waste Icon (meter that spent the most)
  * ✅ New element at dashboard indicator that pulses indicating real time communication
  * ✅ New status indicator to Rush Hour
  * ✅ New status indicator to Productive Hour
* ✅ Changed phrase `[…] no dia 1 de todos os meses. […]` to `[…] no dia 1 de cada mês. […]` at consumption and cost alert creation
* ✅ Changed label `Digite um valor` to `Digite o valor a ser utilizado` in step 4 at power factor alert creation
* ✅ Changed label `Dados Brutos` to `*Dados Brutos` in scale visualization options at Export Report Form
* ✅ Meters Tree Filter scale visualization options labels changed
  * ✅ `*Limite de 12 horas de seleção` to `Limite de 12 horas de seleção`
  * ✅ `*Limite de 24 horas de seleção` to `Limite de 24 horas de seleção`
  * ✅ `*Limite de 1 mês de seleção` to `Limite de 1 mês de seleção`
  * ✅ `*Limite de 26 semanas de seleção` to `Limite de 26 semanas de seleção`
  * ✅ `*Limite de 24 meses de seleção` to `Limite de 24 meses de seleção`
* ✅ Changed label `Cancel` to `Cancelar` at Edit Working Hour modal and Create Working Hour modal
* ✅ Using Row to align Rush Start Time input and Rush End Time input at same line in Default Fare Form
* ✅ Showing nothing at meter detail when a group is selected at Meters Page
* ✅ Hiding companies select at meters tab, when list visualization is chosen (at branch details page) when the logged user is "root"
* ✅ Initial value "Selecione uma empresa" added to Companies Select
* ✅ Min width added to Companies Select
* ✅ New highlight to current working hours at working hours listing of a branch
* ✅ New highlight to current working hours at working hours listing of a egg
* ✅ New highlight to current fare at consumption fare listing
* ✅ New highlight to current fare at demand exceeding fare listing
* ✅ New highlight to current fare at demand fare listing
* ✅ Consumption fare listing using new reusable component FareTimeLineList
* ✅ Demand exceeding fare listing using new reusable component FareTimeLineList
* ✅ Demand fare listing using new reusable component FareTimeLineList
* ✅ Column "Código" added in companies list at Company Page
* ✅ Removed column "Endereço" in companies list at Company Page
* ✅ Formatted date to DD/MM/YYYY at Performance Index Report Form
* ✅ Format dates to DD/MM at Performance Index Chart of Dashboard
* ✅ Removed scale visualization descriptions at Export Report Form
* ✅ Export Report Form
  * ✅ Possible to select the same day in start and end date
  * ✅ Time selection should not be available to be selected on datepickers
  * ✅ Days after of current date (or days not ended yet) should not be available to be selected on datepickers
* ✅ Changed label `1 mês` to `1 Mês` in step 3 at alert creation (consumption and cost)
* ✅ Changed label at create fare button from `Cadastrar Nova Tarifa de Demanda Contradata` to `Cadastrar Nova Tarifa`
* ✅ Changed label at create fare button from `Cadastrar Nova Tarifa de Ultrapassagem de Demanda` to `Cadastrar Nova Tarifa`
* ✅ Changed label at create fare button from `Cadastrar Nova Tarifa de Consumo` to `Cadastrar Nova Tarifa`
* ✅ Hide all labels in the side menu when its reduced
* ✅ Send property "email" instead of "username" at login request
* ✅ Update Network Configuration of eggs
* ✅ Power and Power Factor Alert Configuration Phrases
  * ✅ if power reach more/less than specific value
    * ✅ Changed phrase in step 5 to `Podemos gerar um alerta imediatamente quando o valor for atingido ou podemos esperar para que ele permaneça neste valor por um certo intervalo de tempo antes de gerar um alerta. Escolha uma das opções a seguir:`
    * ✅ if power reach more/less than specific value, immediatly
      * ✅ Put endpoint in final sentence.
      * ✅ Put word "immediatly" at the end of phrase, for example: `[...], atingir acima de 1kw, quero emitir um alerta imediatamente.`
  * ✅ if power reach more/less than previous period, change phrases
    * ✅ In step 4:
      * ✅ Changed phrase `Selecione uma das opções abaixo para medição` to `Baseando-se no período selecionado, podemos usar o valor médio, máximo ou mínimo para efetuar a comparação. Selecione um das opções abaixo para compor o alerta`
      * ✅ Changed labels to `Valor médio`, `Valor máximo` and `Valor mínimo`
      * ✅ Changed final phrase to `Porcentagem do valor selecionado a ser usada na comparação.`.
    * ✅ In step 5:
      * ✅ Changed phrase to `Podemos gerar um alerta imediatamente quando o valor for atingido ou podemos esperar para que ele permaneça neste valor por um certo intervalo de tempo antes de gerar um alerta. Escolha uma das opções a seguir:`.
    * ✅ In step 7:
      * ✅
* ✅ Changed final phrase in step 7 to alert immediatly: `As condições abaixo foram geradas à partir do (Valor médio/máximo/mínimo) de potência no período XX/XX/XXX até XX/XX/XXXX. Caso alguma destas condições seja atingida, um alerta será emitido imediatamente.`
* ✅ Changed final phrase in step 7 to alert for:
  * 15 min
  * 1 hora
  * 12 horas
  * 24 horas
  * resulting in: `As condições abaixo foram geradas à partir do (Valor médio/máximo/mínimo) de potência no período XX/XX/XXX até XX/XX/XXXX. Caso alguma destas condições permaneça por (15 minutos, 1 hora, 12 horas, 24 horas), um alerta será emitido.`
* ✅ Standardize edges in the Tables of Productive Hours, Rush Hours, Apportionment

### Fixed

* ✅ Max value of 9999999999999.99 added to InputDecimalNumber
* ✅ Filename input validating whitespaces in Export Report Form
* ✅ Increased width at create custom working hours modal to an egg
* ✅ Using telephone mask at:
  * ✅ User create form
  * ✅ User edit form (accessible from list of user)
  * ✅ General Information of branch form
  * ✅ Form for editing your own user profile
* ✅ Clear dates after change scale visualization in Meters Tree Filter
* ✅ Drag and Drop of meters should send request
* ✅ Undefined dates after change alert types in Alert Configuration
* ✅ Back button in Branch Details
* ✅ Show request error in Working Hours creation and Editing
* ✅ Increase height of SideBar to select meters
* ✅ Department and SubDepartment inputs (in general information of branch form) not available to change selected option
* ✅ Render Edit and Delete button at Current Egg Working Hours Component
* ✅ Select user role at create user modal
* ✅ Remove Consumption Fare modal and button
* ✅ Remove Demand Exceed Fare modal and button
* ✅ Remove Demand Fare modal and button
* ✅ Reload current branch fares and demand exceed fares list after disable a demand exceed fare
* ✅ Reload current branch fares and demand fares list after disable a demand fare
* ✅ Reload current branch fares and demand exceed fares list after edit or remove a demand exceed fare
* ✅ Reload current branch fares and demand fares list after edit or remove a demand fare
* ✅ Reload current branch fares and consumption fares list after edit or remove a consumption fare
* ✅ Dates validation in disable fare form based on current fare
* ✅ Layout breaks in Alert Page
* ✅ Admin and Root users are not associated with a branch in the user create form
* ✅ Admin and Root users are not associated with a branch in the user edition form
* ✅ Consider that endDate can be null to separate items in next, previous and current in Fare and Working Hours listing
* ✅ Initialize e-mail and role fields at edit user form
* ✅ Show company image to users with role "user".
* ✅ BranchTabs breaks when accessed by url
* ✅ Select 00:00 and 00:30 when is 1 HOUR Scale

## 0.9.0 - 2018-07-13

### Added

* ✅ **Create Power Factor Alert Configuration**
  * ✅ if power reach more/less than specific value, alert immediately
  * ✅ if power reach more/less than specific value, alert for 24 hours
  * ✅ if power reach more/less than specific value, alert for 12 hours
  * ✅ if power reach more/less than specific value, alert for 1 hours
  * ✅ if power reach more/less than specific value, alert for 15 Minutes
* ✅ Select 00:00 and 00:30 when is 1 HOUR Scale
* ✅ Limitation Description of Scale Visualization
* ✅ Empty State for Dashboard
* ✅ Register more than one Wifi
* ✅ Edit Users
* ✅ Edit My Profile
* ✅ Validate if email is unique

### Changed

* ✅ Change Final Phrase of Consumption Alert Configuration Creation
* ✅ Change Label `Pesquisar` to `Filtrar` on Performance Index
* ✅ Change label `Uma Semana` to `Semanal` and `Um mês` to `Mensal`
* ✅ Rediagram Dashboard components
* ✅ Remove right labels of Demand Exceeding Chart
* ✅ Add 5 decimal places on Fare Registration
* ✅ Change icons of Sidebar Menus

### Fixed

* ✅ Select the same date on 1 Hour Scale
* ✅ Select the time **:00 or **:30 when is 1 hour scale
* ✅ Select the same date on 30 minutes Hour Scale

## 0.8.0 - 2018-06-29

### Added

* ✅ **Create Financial Cost Alert Configuration**
  * ✅ 1 Hour with Specific Value
  * ✅ 1 Day with Specific Value
  * ✅ 1 Month with Specific Value
  * ✅ 1 Hour with Compared Value
  * ✅ 1 Day with Compared Value
  * ✅ 1 Month with Compared Value
* ✅ **Create Power Alert Configuration**
  * ✅ if power reach more/less than specific value, alert immediately
  * ✅ if power reach more/less than specific value, alert for 24 hours
  * ✅ if power reach more/less than specific value, alert for 12 hours
  * ✅ if power reach more/less than specific value, alert for 1 hours
  * ✅ if power reach more/less than specific value, alert for 15 Minutes
  * ✅ if power reach more/less than compared value, alert immediately
  * ✅ if power reach more/less than compared value, alert for 24 hours
  * ✅ if power reach more/less than compared value, alert for 12 hours
  * ✅ if power reach more/less than compared value, alert for 1 hours
  * ✅ if power reach more/less than compared value, alert for 15 Minutes
* Show Alert Emitted on Horizontal Menu with a red badge, using Real-Time
* ✅ **Dashboard**
  * ✅ Demand Indicator - REAL TIME
  * ✅ Admin Cubi can see Dashboard of any company
  * ✅ Financial Indicator
  * ✅ Show machine with higher consumption
  * ✅ CO2eq emmited Indicator
  * ✅ is Productive Hour or Not indicator
  * ✅ is Rush Hour or Not Indicator
  * ✅ Performance Index Chat
    * Needs to Select Performance Index Configuration
  * ✅ Table with 3 most higher consumption machines
  * ✅ Financial Composition Chart - (TreeMap)
  * ✅ Waste by Schedule
* ✅ Upload of logo
* ✅ See Meter Detail
* ✅ **Detail of Branch**
  * Meters List
  * User List
    * Disattach of branches.

## 0.7.0 - 2018-06-28

### Added

* ✅ Option Raw Data on Exportation Page
* ✅ Added Company Filter for Admin Cubi User to list Meter on Meter Page
* ✅ Highlight Meters that doesn't respond than 12 hours or more
* ✅ Filter Meter List by active or inactive status

### Changed

* ✅ Change label `Escala de visualização` to `Escala`
* ✅ Moved `Name of File` input to line below
* ✅ Removing `Meus` on each Menu on sidebar
* ✅ Change Label `Meus KPIs` to `Índice de Performance`
* ✅ Change button Label `Fazer Relatório` to `Preencher dados` on Performance Index Page
* ✅ Change Label `Editar` to `Salvar` on Working Hour Form
* ✅ Change the Highlight of Current Working Hour
* ✅ Alignment of hour labels of Working Hour to the center
* ✅ Highlight Alert Emitted unresolved
* ✅ Checkbox to select many Emitted Alerts to Mark as Resolved or Unresolved
* ✅ Add Accordion to see the detail of Alert Configuration
  * List of Meters

### Fixed

* ✅ Unselect meter of Meter Sortable Tree when reenter the page Meter Page
* ✅ Automatic Scroll when go to next Step

### Removed

* ✅ Options `15 Minutes`, `30 minutes`, `1 Week` of Export Page

## 0.6.0 - 2018-06-18

### Changed

* ✅ Label of third step when register an Alert
* ✅ Reduce the button size of Register Working Hour
* ✅ Reduce Title Size of Working Hour
* ✅ Change the Unit Label of Fares
* ✅ Change highlight style of current Fare

## 0.5.0 - 2018-06-15

### Added

* ✅ Info Message on Demand Graphic
* ✅ Icon for Demand Fare
* ✅ Unregistered Working Hour alert
* ✅ **Performance Index Page**
  * ✅ List of Performance Index Connfiguration
  * ✅ List of Performance Report
    * Filter By
      * Type of Performance Index Configuration
  * ✅ Can fill Performance Report
* ✅ Added `Horas` and `Minutos` labels on Datepickers
* ✅ **Consumption Alert Configuration Registration**
  * 1 Hour with Specific Value
  * 1 Day with Specific Value
  * 1 Month with Specific Value
  * 1 Hour with Compared Value
  * 1 Day with Compared Value
  * 1 Month with Compared Value
* Edit Consumption Alert
* ✅ **List of Alert Configurations**
  * Can filter by
    * Name of alert
    * Name of Meter
    * Name of Group
* ✅ **List of Emitted Alerts**
  * Can filter by
    * Name of Branch
    * Status
* ✅ Register Working Hour for Meter
* ✅ Register Working Hour for Branch
* ✅ **List of Working Hour of a Branch**
  * Separated by Future, Current and Past
  * Alert of Unregistered Working Hour
* ✅ **List of Working Hour of a Meter**
  * Separated by Future, Current and Past
  * Alert of Unregistered Working Hour
* ✅ Edit Working Hour
* ✅ **List of Consumption Fares**
  * Alert of Unregistered Consumption Fare
* ✅ **List of Demand Fares**
  * Alert of Unregistered Demand Fare
* ✅ **List of Demand Exceeding Fares**
  * Alert of Unregistered Demand Exceeding Fare
* ✅ **List of Meters**
  * Highlight Meters that doesn't respond for 12 hour or longer
* ✅ Delete Fares
* ✅ Disable Demand Exceeding Fare
* ✅ Disable Demand Fare
* ✅ List of Companies
* ✅ **Dashboard Page**
  * ✅ Energy Consumption Indicator
  * ✅ Consumption Tendency compared with past month
  * ✅ Tariff Flag of month selected
* ✅ **Export Page**
  * ✅ Can export data of branches, groups, or meters selected
    * ✅ Can use the following scales for that:
      * 15 Minutes
      * 30 Minutes
      * 1 Hour
      * 1 Day
      * 1 Week
      * 1 Month
    * Can select Range of Dates (start date and end date)
    * Can write name of the exporting data
  * **List of Exported Data**
    * With Download Button
    * With Delete Button
* ✅ Admin Cubi User can see Consumption Data of every Companies
* ✅ Admin Cubi User can see Apportionment Data of every Companies
* ✅ Admin Cubi User can see Demand Data of every Companies
* ✅ Admin Cubi User can see Productive Hour Data of every Companies
* ✅ Admin Cubi User can see Rush Hour Data of every Companies

### Changed

* ✅ Label on Datepicker `Selecionar tempo` to `Selecionar horas`
* ✅ Values of Role Field of User Registration.
  * `Administrador`
  * `Usuário`
* ✅ Distribution Configuration Informations
* ✅ Label change on Attach Branches to user `Editar` to `Confirmar`
* ✅ Chart Colors changed
* ✅ Add Title for Machine Form
* ✅ Fare Registration Buttons Removed
* ✅ Label change on Productive Hour Page, `Consumo de Energia` to `Consumo de Energia kWh`
* ✅ Change Label `Tarifa de Ultrapassagem` to `Tarifa de Ultrapassagem de Demanda`
* ✅ Change label `Tarifa de Demanda` to `Tarifa de Demanda Contratada`

### Fixed

* ✅ **Loading on Forget Password**
* ✅ **Label change on Fare Registration**
  * `kWh` to `kW`
  * `MWh` to `MW`

### Removed

* ✅ Label `Mudança da Tarifa - SUBIDA` on Fare List

## 0.4.0 - 2018-05-10

### Added

* ✅ **My Users On Side Bar Menu**
* **Branch Detail**
  * ✅ Users Tabs
    User List of Branch Selected
  * ✅ Register Fare Tabs
    There is three tabs inside,
    * ✅ **Demand Exceeding Fare**
      * Register Demand Exceeding Fare
      * Update Demand Exceeding Fare
    * ✅ **Consumption Fare**
      * Register Consumption Fare
      * Update Consumption Fare
    * ✅ **Demand Fare**
      * Register Demand Fare
      * Update Demand Fare
* ✅ **Attach Branchs to one User**
* ✅ **Register User**
* ✅ **MeterTreeFilter**
  * One Week Scale
  * Fifteen Minutes Scale
* Alert Message shown when there is no data for analyze with parameters sent
* Forget Password Implemented
* Update Distribution Configuration of Branch Module implemented

## 0.3.0 - 2018-04-20

### Added

* ✅ **Meter Tree Filter**
  * Range Date Picker Conditions
    * ✅ **1 Hour Scale**
    * ✅ **1 Month Scale**
    * ✅ **30 Minutes Scale**
* ✅ **Apportionment Page**
* ✅ **Productive Hours Page**
* ✅ **Rush Hours Page**
* ✅ **Egg Detail Page**
  * Meter Sortable Tree View
  * Update Network Configuration
  * Create Group on Egg
  * List Machines on Egg
  * Create Machine on Egg
  * Update Machine on Egg
* ✅ **Branch Register**
* ✅ **Branch Detail**
  * ✅ General Information Tab

## 0.2.0 - 2018-03-26

### Added

* ✅ **Login Page**
  * Range Date Picker Conditions
    * ✅ 1 Hour Scale
    * ✅ 1 Month
* ✅ **Password**
* ✅ **Forget Password**
* ✅ **MeterTreeFilter**
  * Meter Selection
  * Select Date Range
  * Scale Selection
* ✅ **Register Meter**
* ✅ **Default Layout for internal pages**
* ✅ **Consumption Analysis Page**
* ✅ **Power Demand Analysis Page**

## 0.1.0 - 2018-03-02

### Added

* ✅ **PLOP - Code Generator implemented**
  * Page Container with simple CRUD implemented!
* ✅ **Webpack configuration**
  * Babel-config
* ✅ **InjectSaga implemented**
  Saga Injection on demand to improve Code Splitting
* ✅ **InjectReducer Implemented**
  Reducer Injection on demand to improve Code Splitting
* ✅ **React Router Implemented**
  React Router to separate routes

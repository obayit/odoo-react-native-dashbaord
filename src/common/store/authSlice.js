import { createSlice } from "@reduxjs/toolkit"
import { Platform } from "react-native"

const initialState = { uid: null }
const defaultDb = 'v17dash'
const defaultUrl = 'http://192.168.1.101:8017'

const initialConfigurationState = {
  baseUrl: defaultUrl,
  database:  defaultDb,
}
const initialErrorsState = []

const initialConfigurationStateWeb = {
  baseUrl: '',
  database:  defaultDb,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => action.payload,
    logOut: () => initialState,
  },
})

const configurationSlice = createSlice({
  name: 'configuration',
  initialState: Platform.OS == 'web' ? initialConfigurationStateWeb : initialConfigurationState,
  reducers: {
    setConfiguration: (state, action) => action.payload,
    updateConfiguration: (state, action) => {return {...state, ...action.payload } },
  },
})

const errorsSlice = createSlice({
  name: 'errors',
  initialState: initialErrorsState,
  reducers: {
    setErrors: (state, action) => action.payload,
    addError: (state, action) => { state.push(action.payload) },
    clearErrors: () => initialErrorsState,
    flagShown(state, action) {
      const err = state.find(item => item.id === action.payload)
      if (err) {
        err.shown = true
      }
    },
  },
})

export const { setAuth, logOut } = authSlice.actions
export const { setConfiguration, updateConfiguration } = configurationSlice.actions
export const { setErrors, addError, clearErrors, flagShown } = errorsSlice.actions

export default authSlice.reducer
export const configurationReducer = configurationSlice.reducer
export const errorsReducer = errorsSlice.reducer

export const selectAuth = (state) => state.auth
export const selectConfiguration = (state) => state.configuration
export const selectErrors = (state) => state.errors


/*

2026-01-02 13:49:01,181 253944 ERROR v17issue231984 odoo.modules.registry: Failed to load registry 
Traceback (most recent call last):
  File "/home/obayit/src/vs/odoo17/odoo/modules/registry.py", line 114, in new
    odoo.modules.load_modules(registry, force_demo, status, update_module)
  File "/home/obayit/src/vs/odoo17/odoo/modules/loading.py", line 476, in load_modules
    processed_modules += load_marked_modules(env, graph,
  File "/home/obayit/src/vs/odoo17/odoo/modules/loading.py", line 364, in load_marked_modules
    loaded, processed = load_module_graph(
  File "/home/obayit/src/vs/odoo17/odoo/modules/loading.py", line 180, in load_module_graph
    registry.setup_models(env.cr)
  File "<decorator-gen-19>", line 2, in setup_models
  File "/home/obayit/src/vs/odoo17/odoo/tools/func.py", line 87, in locked
    return func(inst, *args, **kwargs)
  File "/home/obayit/src/vs/odoo17/odoo/modules/registry.py", line 319, in setup_models
    model._setup_base()
  File "/home/obayit/src/vs/odoo17/odoo/models.py", line 3345, in _setup_base
    self._add_field(name, Field(_base_fields=fields_))
  File "/home/obayit/src/vs/odoo17/odoo/models.py", line 668, in _add_field
    field.__set_name__(cls, name)
  File "/home/obayit/src/vs/odoo17/odoo/fields.py", line 404, in __set_name__
    self._setup_attrs(owner, name)
  File "/home/obayit/src/vs/odoo17/odoo/fields.py", line 506, in _setup_attrs
    attrs = self._get_attrs(model_class, name)
  File "/home/obayit/src/vs/odoo17/odoo/fields.py", line 430, in _get_attrs
    raise Exception('hi')



    2026-01-02 13:50:32,963 255886 CRITICAL v17issue231984 odoo.modules.module: Couldn't load module precompute_bug 
2026-01-02 13:50:32,964 255886 WARNING v17issue231984 odoo.modules.loading: Transient module states were reset 
2026-01-02 13:50:32,964 255886 ERROR v17issue231984 odoo.modules.registry: Failed to load registry 
Traceback (most recent call last):
  File "/home/obayit/src/vs/odoo17/odoo/fields.py", line 404, in __set_name__
    self._setup_attrs(owner, name)
  File "/home/obayit/src/vs/odoo17/odoo/fields.py", line 506, in _setup_attrs
    attrs = self._get_attrs(model_class, name)
  File "/home/obayit/src/vs/odoo17/odoo/fields.py", line 477, in _get_attrs
    raise Exception('hi')
Exception: hi

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/home/obayit/src/vs/odoo17/odoo/modules/registry.py", line 114, in new
    odoo.modules.load_modules(registry, force_demo, status, update_module)
  File "/home/obayit/src/vs/odoo17/odoo/modules/loading.py", line 476, in load_modules
    processed_modules += load_marked_modules(env, graph,
  File "/home/obayit/src/vs/odoo17/odoo/modules/loading.py", line 364, in load_marked_modules
    loaded, processed = load_module_graph(
  File "/home/obayit/src/vs/odoo17/odoo/modules/loading.py", line 185, in load_module_graph
    load_openerp_module(package.name)
  File "/home/obayit/src/vs/odoo17/odoo/modules/module.py", line 395, in load_openerp_module
    __import__(qualname)
  File "/home/obayit/src/odoo_playground/precompute_bug/__init__.py", line 4, in <module>
    from . import models
  File "/home/obayit/src/odoo_playground/precompute_bug/models/__init__.py", line 3, in <module>
    from . import models
  File "/home/obayit/src/odoo_playground/precompute_bug/models/models.py", line 19, in <module>
    class AccountMoveLine(models.Model):
  File "/home/obayit/src/vs/odoo17/odoo/models.py", line 219, in __new__
    return super().__new__(meta, name, bases, attrs)
  File "/home/obayit/src/vs/odoo17/odoo/api.py", line 82, in __new__
    return type.__new__(meta, name, bases, attrs)
RuntimeError: Error calling __set_name__ on 'Json' instance 'analytic_distribution' in 'AccountMoveLine'
2026-01-02 13:50:32,965 255886 CRITICAL v17issue231984 odoo.service.server: Failed to initialize database `v17issue231984`. 
Traceback (most recent call last):
  File "/home/obayit/src/vs/odoo17/odoo/fields.py", line 404, in __set_name__
    self._setup_attrs(owner, name)
  File "/home/obayit/src/vs/odoo17/odoo/fields.py", line 506, in _setup_attrs
    attrs = self._get_attrs(model_class, name)
  File "/home/obayit/src/vs/odoo17/odoo/fields.py", line 477, in _get_attrs
    raise Exception('hi')
Exception: hi
*/

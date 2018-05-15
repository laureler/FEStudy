var CASAuthentication = require('cas-authentication');

var cas = new CASAuthentication({
  // cas 登录地址
  cas_url         : 'http://localhost:8080/cas/login',
  service_url     : 'https://my-service-host.com',
  cas_version     : '3.0',
  renew           : false,
  is_dev_mode     : false,
  dev_mode_user   : '',
  dev_mode_info   : {},
  session_name    : 'cas_user',
  session_info    : 'cas_userinfo',
  destroy_session : false
});

// 必要的cas url地址
// cas_url：	string	The URL of the CAS server.	(required)
// 作为有效服务向CAS服务器注册的应用程序的URL
// 在cas服务上注册的一个服务的url地址
// service_url：	string	The URL of the application which is registered with the CAS server as a valid service.	(required)
// cas 版本 默认的协议是3.0
// cas_version	"1.0"|"2.0|"3.0"|"saml1.1"	The CAS protocol version.	"3.0"
// 如果是真，不管是否已经验证了都需要再次验证一次
// renew：	boolean	If true, an unauthenticated client will be required to login to the CAS system regardless of whether a single sign-on session exists.	false
// 是否是开发模式
// is_dev_mode：	boolean	If true, no CAS authentication will be used and the session CAS variable will be set to whatever user is specified as dev_mode_user.	false
//
// dev_mode_user：	string	The CAS user to use if dev mode is active.	""
// dev_mode_info：	Object	The CAS user information to use if dev mode is active.	{}
// 会话变量的名称
// session_name：	string	The name of the session variable that will store the CAS user once they are authenticated.	"cas_user"
// session 信息
// session_info：	string	The name of the session variable that will store the CAS user information once they are authenticated. If set to false (or something that evaluates as false), the additional information supplied by the CAS will not be forwarded. This will not work with CAS 1.0, as it does not support additional user information.	false
// destroy_session：	boolean	If true, the logout function will destroy the entire session upon CAS logout. Otherwise, it will only delete the session variable storing the CAS user.
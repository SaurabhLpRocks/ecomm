namespace Ecomm.Settings
{
    public class ConnectionStrings
    {
        public string ProductAppDb { get; set; }
    }

    public class AppSettings
    {
        public ConnectionStrings ConnectionStrings { get; set; }
        public string AllowedHosts { get; set; }
    }
}

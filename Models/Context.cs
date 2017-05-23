using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Accelera.Models
{
    public class Context: DbContext
    {
        public Context() : base("name=sqlConnection")
        {
        }
        public DbSet<TodoItem> TodoItems { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

    }
}